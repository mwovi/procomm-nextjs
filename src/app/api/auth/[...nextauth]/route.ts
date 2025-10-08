import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'

interface AdminUser {
  id: string
  email: string
  name: string
  role: string
}

const client = new MongoClient(process.env.MONGODB_URI!)
const clientPromise = client.connect()

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
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
          await connectDB()
          
          // For now, we'll use a hardcoded admin user
          // In production, you'd want to store this in the database
          const adminEmail = process.env.ADMIN_EMAIL || 'admin@procommmedia.com'
          const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

          if (credentials.email === adminEmail) {
            const isValid = await bcrypt.compare(credentials.password, await bcrypt.hash(adminPassword, 12))
            
            if (isValid) {
              return {
                id: '1',
                email: adminEmail,
                name: 'Admin',
                role: 'admin'
              } as AdminUser
            }
          }

          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as AdminUser).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/admin/login'
  }
})

export { handler as GET, handler as POST }