import { Mutation } from "@/lib/apollo/types";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { serialize } from "cookie";
import { type NextRequest, NextResponse } from "next/server";

const apolloClient = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
	cache: new InMemoryCache(),
});

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams;
	const code = query.get("code");
	const error = query.get("error");
	const errorDescription = query.get("error_description");

	if (error) {
		return NextResponse.redirect(new URL(`/?err=${errorDescription}`, req.url));
	}

	if (!code) {
		return NextResponse.redirect(
			new URL(`/?err=${encodeURIComponent("No code was provided")}`, req.url),
		);
	}

	const GET_TOKEN = gql`
        mutation Token($token: String!) {
            token(input: { token: $token }) {
                expires_in
                access_token
                refresh_token
            }
        }
    `;

	try {
		const { data: token } = await apolloClient.mutate<Mutation>({
			mutation: GET_TOKEN,
			variables: {
				token: code,
			},
			context: {
				headers:
					process.env.NODE_ENV === "production"
						? {
								"x-build": "production",
						  }
						: {},
			},
		});

		if (!token?.token.access_token) {
			return NextResponse.redirect(
				new URL(
					`/?err=${encodeURIComponent(
						"No access_token was provided from Discord. Please try again later",
					)}`,
					req.url,
				),
			);
		}

		const cookie = serialize("session", token.token.access_token, {
			expires: new Date(Date.now() + token.token.expires_in),
			httpOnly: false,
			secure: false,
			path: "/",
		});

		const res = NextResponse.redirect(new URL("/api/auth/success", req.url));
		res.headers.append("Set-Cookie", cookie);

		return res;
	} catch (e) {
		console.log(e);
		return Response.json({
			ok: false,
			message: "server error, check dev console",
		});
	}
}
