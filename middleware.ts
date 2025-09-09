// middleware.ts (in your root directory)
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl
        const token = req.nextauth.token

        console.log(`Middleware: ${pathname}, Token: ${!!token}`)

        // Define route categories
        const protectedRoutes = ['/', '/dashboard', '/profile', '/settings', '/admin']
        const publicRoutes = ['/login', '/register', '/forgot-password']
        const openRoutes = ['/about', '/contact', '/help'] // Always accessible

        const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
        const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
        const isOpenRoute = openRoutes.includes(pathname)

        // If user has token and is on public route (login/register), redirect to dashboard
        if (token && isPublicRoute) {
            console.log(`Redirecting authenticated user from ${pathname} to /dashboard`)
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        // If user has no token and is on protected route, redirect to login
        if (!token && isProtectedRoute) {
            console.log(`Redirecting unauthenticated user from ${pathname} to /login`)
            return NextResponse.redirect(new URL('/login', req.url))
        }

        // Allow access to all other routes
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl

                // Define route categories
                const protectedRoutes = ['/dashboard', '/profile', '/settings', '/admin']
                const publicRoutes = ['/login', '/register', '/forgot-password']
                const openRoutes = ['/', '/about', '/contact', '/help']

                const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
                const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
                const isOpenRoute = openRoutes.includes(pathname)

                // Always allow access to open routes
                if (isOpenRoute) {
                    return true
                }

                // Always allow access to public routes (middleware function will handle redirects)
                if (isPublicRoute) {
                    return true
                }

                // For protected routes, require a token
                if (isProtectedRoute) {
                    return !!token
                }

                // Allow access to any other routes by default
                return true
            },
        },
    }
)

// Configure which paths should be processed by middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files (images, etc.)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ]
}