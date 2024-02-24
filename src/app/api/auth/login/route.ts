const LOGIN_URL = `https://discord.com/oauth2/authorize?client_id=1197575977333702676&response_type=code&redirect_uri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_URL}/api/auth/callback`)}&scope=identify`

export async function GET() {
    return Response.redirect(LOGIN_URL)
}