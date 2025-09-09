"use client"

import { SessionProvider } from "next-auth/react"

export function AuthSessionProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return
    <SessionProvider
        // Session will be refetched when window focuses
        refetchOnWindowFocus={true}
        // Session will be refetched every 5 minutes
        refetchInterval={5 * 60}>
        {children}
    </SessionProvider>
}