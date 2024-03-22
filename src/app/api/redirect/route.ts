import { NextRequest } from "next/server";

const sources: Record<string, string> = {
	dc: "https://discord.gg/qhuQkGWmsE",
	x: "https://twitter.com/dbotslist",
	gh: "https://github.com/dbotslist"
};

export async function GET(req: NextRequest) {
	const source = req.nextUrl.searchParams.get("s");
	const isValidSource = source && sources[source];

	if (!isValidSource)
		return Response.json({ message: "invalid source", redirect: false });

	return Response.redirect(sources[source]);
}
