"use client"

import { useSession } from "next-auth/react"

export function useAuth() {
    const { data: session, status } = useSession()

    return {
        // Session data
        user: session?.user,
        session,

        // Authentication states
        isAuthenticated: !!session,
        isLoading: status === "loading",

        // User data (guaranteed to exist on protected pages due to middleware)
        userName: session?.user?.name || "Unknown User",
        userEmpId: session?.user?.empid || "UNKNOWN",
        userAvatar: session?.user?.image || "",

        // Status
        status,
    }
}

// Simple hook for user data with fallbacks
export function useUserData() {
    const { user } = useAuth()

    return {
        name: user?.name ?? "Unknown User",
        empId: user?.empid ?? "UNKNOWN",
        avatar: user?.image ?? "",
        initials: user?.name
            ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
            : "UU"
    }
}

// Hook that assumes user is authenticated (safe to use on protected pages)
export function useAuthenticatedUser() {
    const { user, session } = useAuth()

    // Since middleware protects routes, we can assume user exists on protected pages
    if (!user || !session) {
        // This shouldn't happen on protected pages, but just in case...
        throw new Error("User not authenticated - this shouldn't happen on protected pages")
    }

    return {
        user,
        session,
        name: user.name!,
        empId: user.empid!,
        avatar: user.image || "",
    }
}