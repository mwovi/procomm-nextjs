import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/lib/mongodb'

interface AdminUser {
  id: string
  email: string
  name: string
  role: string
}

export const authOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Test database connection
          await connectDB()
          console.log('✅ Database connected successfully')
          
          // Use hardcoded admin credentials for now
          const adminEmail = process.env.ADMIN_EMAIL || 'admin@procomm.com'
          const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

          console.log('Login attempt:', credentials.email)
          console.log('Expected admin:', adminEmail)

          if (credentials.email === adminEmail && credentials.password === adminPassword) {
            console.log('✅ Admin login successful')
            return {
              id: '1',
              email: adminEmail,
              name: 'Admin',
              role: 'admin'
            } as AdminUser
          }

          console.log('❌ Invalid credentials')
          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour - session will be updated after this time
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login'
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async redirect({ url, baseUrl }: any) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      if (user) {
        token.role = (user as AdminUser).role
        token.iat = Math.floor(Date.now() / 1000) // Set issued at time
      }
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (token && session.user) {
        (session.user as AdminUser).id = token.sub as string
        ;(session.user as AdminUser).role = token.role as string
      }
      return session
    }
  },
  events: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user }: any) {
      console.log('User signed in:', (user as AdminUser).email)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signOut({ session, token }: any) {
      console.log('User signed out:', token?.email || (session?.user as AdminUser)?.email)
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }