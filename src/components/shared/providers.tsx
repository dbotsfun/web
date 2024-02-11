"use client";

import { apolloClient } from "@/lib/apollo/client";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import ProgressBar from 'nextjs-toploader';
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        <ProgressBar color="hsl(var(--primary))" />
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    </ThemeProvider>
}