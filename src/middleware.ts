// middleware.ts (in your root directory)
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl
        const token = req.nextauth.token

        console.log(`Middleware: ${pathname}, Token: ${!!token}`)

        // Define public routes (everything else is protected)
        const publicRoutes = ['/login', '/register', '/forgot-password']

        const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

        // Handle root path specifically
        if (pathname === '/') {
            if (token) {
                console.log(`Redirecting authenticated user from / to /dashboard`)
                return NextResponse.redirect(new URL('/dashboard', req.url))
            } else {
                console.log(`Redirecting unauthenticated user from / to /login`)
                return NextResponse.redirect(new URL('/login', req.url))
            }
        }

        // If user has token and is on public route (login/register), redirect to dashboard
        if (token && isPublicRoute) {
            console.log(`Redirecting authenticated user from ${pathname} to /dashboard`)
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        // If user has no token and is NOT on public route, redirect to login
        // (This protects ALL routes except public routes)
        if (!token && !isPublicRoute) {
            console.log(`Redirecting unauthenticated user from ${pathname} to /login`)
            return NextResponse.redirect(new URL('/login', req.url))
        }

        // Allow access (either authenticated user or on public route)
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl

                // Define public routes (everything else is protected)
                const publicRoutes = ['/login', '/register', '/forgot-password']

                const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

                // Root path - always allow (middleware function will handle redirects)
                if (pathname === '/') {
                    return true
                }

                // Always allow access to public routes
                if (isPublicRoute) {
                    return true
                }

                // For ALL OTHER routes, require a token (PROTECT EVERYTHING ELSE)
                return !!token
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