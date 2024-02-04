import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: "https://dbots.tanuki.cf/",
    cache: new InMemoryCache(),
});