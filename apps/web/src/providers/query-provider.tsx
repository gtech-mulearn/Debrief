/**
 * TanStack Query Provider
 * 
 * Provides query client to all client components.
 */

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

interface QueryProviderProps {
    children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Stale time of 30 seconds
                        staleTime: 30 * 1000,
                        // Retry failed requests once
                        retry: 1,
                        // Refetch on window focus
                        refetchOnWindowFocus: true,
                    },
                    mutations: {
                        // Don't retry mutations
                        retry: false,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
