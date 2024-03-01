"use client";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { parseCookies } from "nookies";

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    credentials: "include"
});

const authLink = setContext((_, { headers }) => {
    const { session } = parseCookies();

    console.log("document.cookie", document.cookie)
    console.log("session cookie", session)

    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${session}`,
        },
    };
});

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});