// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { LoginSchema } from "@/lib/validation/validation"

declare module "next-auth" {
    interface Session {
        user: {
            empid: string
        } & DefaultSession["user"]
    }
    interface User {
        empid: string // ← Changed to match what we return
    }
}

const prisma = new PrismaClient()

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                userEmpID: { label: "Employee ID", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    // Validate input
                    const validatedFields = LoginSchema.safeParse(credentials)

                    if (!validatedFields.success) {
                        return null
                    }

                    const { userEmpID, password } = validatedFields.data

                    // Find user by employee ID
                    const user = await prisma.user.findUnique({
                        where: {
                            userEmpID: userEmpID.toUpperCase(),
                        },
                    })

                    if (!user) {
                        return null
                    }

                    // Verify password
                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (!passwordsMatch) {
                        return null
                    }

                    // Return user object (excluding password)
                    return {
                        id: user.id,
                        name: user.userName,
                        image: user.avatar,
                        empid: user.userEmpID,
                    }
                } catch (error) {
                    console.error("Authentication error:", error)
                    return null
                } finally {
                    await prisma.$disconnect()
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.empid = user.empid
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.empid = token.empid as string
            }
            return session
        },
    },
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
})

export { handler as GET, handler as POST }