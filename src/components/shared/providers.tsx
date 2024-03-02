"use client";

import { ApolloProvider } from "@apollo/client";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";
import ProgressBar from "nextjs-toploader";
import React from "react";
import { apolloClient } from "./apollo-client";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<ProgressBar color="hsl(var(--primary))" />
				<ApolloProvider client={apolloClient}>
					<div>{children}</div>
				</ApolloProvider>
			</ThemeProvider>
		</NextUIProvider>
	);
}
