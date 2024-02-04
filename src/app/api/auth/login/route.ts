const LOGIN_URL = "https://discord.com/oauth2/authorize?client_id=1197575977333702676&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&scope=identify"

export async function GET() {
    return Response.redirect(LOGIN_URL)
}