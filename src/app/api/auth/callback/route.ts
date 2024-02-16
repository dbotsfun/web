import { apolloClient } from "@/lib/apollo/client";
import { Mutation } from "@/lib/apollo/types";
import { gql } from "@apollo/client";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const code = query.get("code")
    const error = query.get("error")
    const errorDescription = query.get("error_description")

    if (error) {
        return NextResponse.redirect(
            new URL(`/?err=${errorDescription}`, req.url)
        );
    }

    if (!code) {
        return NextResponse.redirect(
            new URL(`/?err=${encodeURIComponent("No code was provided")}`, req.url)
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
    `

    const { data: token, errors } = await apolloClient.mutate<Mutation>({
        mutation: GET_TOKEN,
        variables: {
            token: code,
        },
    })

    if (errors?.length) {
        console.log(errors)
        return NextResponse.redirect(
            new URL(`/?err=${encodeURIComponent(errors[0].message)}`, req.url)
        );
    }

    if (!token?.token.access_token) {
        return NextResponse.redirect(
            new URL(`/?err=${encodeURIComponent(
                "No access_token was provided from Discord. Please try again later"
            )}`, req.url)
        );
    }

    const expiresInMilliseconds = token.token.expires_in * 1000;

    const cookie = serialize("session", token.token.access_token, {
        expires: new Date(Date.now() + expiresInMilliseconds),
        httpOnly: process.env.NODE_ENV === "development" ? false : true, // do not set the 'true' if in 'dev'
        secure: process.env.NODE_ENV === "development" ? false : true, // do not set the 'true' if in 'dev'
        path: "/",
    });

    console.log(cookie, token.token.access_token)

    const res = NextResponse.redirect(new URL("/api/auth/success", req.url));
    res.headers.append("Set-Cookie", cookie);

    return res;
}