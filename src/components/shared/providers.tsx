"use client";

import { apolloClient } from "@/lib/apollo/client";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    </ThemeProvider>
}