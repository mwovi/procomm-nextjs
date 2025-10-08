import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Check if user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.startsWith('/admin/login')) {
      // Check if user has admin role
      if (req.nextauth.token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page
        if (req.nextUrl.pathname === '/admin/login') {
          return true
        }
        
        // Require authentication for admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'admin'
        }
        
        // Allow all other routes
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*']
}