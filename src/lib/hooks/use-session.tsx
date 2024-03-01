import { useSessionQuery } from "../apollo/types";

export function useSession() {
    return useSessionQuery({
        fetchPolicy: "network-only",
        pollInterval: 15_000
    })
}