import { QueryHookOptions } from "@apollo/client";
import { SessionQuery, SessionQueryVariables, useSessionQuery } from "../apollo/types";

export function useSession(opts?: QueryHookOptions<SessionQuery, SessionQueryVariables>) {
	return useSessionQuery({
		fetchPolicy: "network-only",
		pollInterval: 15_000,
		...opts
	});
}
