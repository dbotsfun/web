import { apolloClient } from "@/components/shared/apollo-client";
import { Query } from "@/lib/apollo/types";
import { avatar } from "@/lib/utils";
import { gql } from "@apollo/client";
import { ImageResponse } from "next/og";

const BOT_QUERY = gql`
    query Bot($id: ID!) {
            getBot(id: $id) {
                id
                avatar
                certified
                name
                status
                shortDescription
                prefix
                guildCount
                tags
                votes
            }
    }
`;

export async function GET(
	req: Request,
	{ params }: { params: { id: string } },
) {
	const { data: bot, error } = await apolloClient.query<Query>({
		query: BOT_QUERY,
		variables: {
			id: params.id,
		},
	});

	if (error || !bot)
		return Response.json(
			{
				error: error?.message ?? "bot not found",
				ok: false,
			},
			{
				status: 500,
			},
		);

	return new ImageResponse(
		<div tw="bg-zinc-900 w-full h-full font-bold text-xl">
			<img
				alt=""
				width={200}
				tw="border-4 border-rose-500"
				style={{ borderRadius: 9999 }}
				src={avatar(bot.getBot.avatar, bot.getBot.id)}
			/>
			<h1 style={{ marginTop: 20 }}>{bot.getBot.name}</h1>
		</div>,
		{
			width: 1200,
			height: 600,
		},
	);
}
