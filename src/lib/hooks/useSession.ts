import { useQuery } from "@apollo/client";
import { GET_SESSION } from "../apollo/queries/auth";
import { Query } from "../apollo/types/graphql";

export function withAuth(session?: string) {
    return {
        context: {
            headers: {
                Authorization: session ? `Bearer ${session}` : "no"
            }
        }
    }
}

export function useSession(cookies: { session?: string }) {
    return useQuery<Query>(GET_SESSION, withAuth(cookies.session))
}