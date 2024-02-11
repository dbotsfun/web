import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { parseCookies } from "nookies";

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
    const cookies = parseCookies();
    const session = cookies.session;

    return {
        headers: {
            ...headers,
            Authorization: session ? `Bearer ${session}` : "",
        },
    };
});

export const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});