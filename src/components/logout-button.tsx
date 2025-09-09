// src/components/logout-button.tsx
"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface LogoutButtonProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    className?: string
    showText?: boolean
}

export function LogoutButton({
    variant = "ghost",
    size = "default",
    className = "",
    showText = true
}: LogoutButtonProps) {
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)

        try {
            // Middleware will automatically redirect to login after signOut
            await signOut({
                callbackUrl: "/login",
                redirect: true,
            })

            toast.success("Logged out successfully")
        } catch (error) {
            console.error("Logout error:", error)
            toast.error("Error logging out")
            setIsLoggingOut(false)
        }
    }

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`${showText ? 'justify-start gap-2' : ''} ${className}`}
        >
            {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <LogOut className="h-4 w-4" />
            )}
            {showText && (isLoggingOut ? "Logging out..." : "Log out")}
        </Button>
    )
}