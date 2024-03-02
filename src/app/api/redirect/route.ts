import { NextRequest } from "next/server";

const sources: Record<string, string> = {
	dc: "https://discord.gg/qhuQkGWmsE",
};

export async function GET(req: NextRequest) {
	const source = req.nextUrl.searchParams.get("s");
	const isValidSource = source && sources[source];

	if (!isValidSource)
		return Response.json({ message: "invalid source", redirect: false });
	// biome-ignore lint/style/noUselessElse: tf?
	else return Response.redirect(sources[source]);
}
