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
        empid: string
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
                    const validatedFields = LoginSchema.safeParse(credentials)

                    if (!validatedFields.success) {
                        return null
                    }

                    const { userEmpID, password } = validatedFields.data

                    const user = await prisma.user.findUnique({
                        where: {
                            userEmpID: userEmpID.toUpperCase(),
                        },
                    })

                    if (!user) {
                        return null
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (!passwordsMatch) {
                        return null
                    }

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
        error: "/login",
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
        // Session will expire in 30 days
        maxAge: 30 * 24 * 60 * 60, // 30 days
        // Update session activity every 24 hours
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        // JWT tokens expire in 30 days
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    events: {
        async signIn({ user, account, profile, isNewUser }) {
            console.log(`User ${user.name} signed in`)
        },
        async signOut({ session, token }) {
            console.log(`User signed out`)
        },
    },
})

export { handler as GET, handler as POST }