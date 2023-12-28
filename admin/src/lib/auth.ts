import { prisma } from '@/lib/db'
import { compare } from 'bcryptjs'
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions
} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }

  interface User {}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        if (user) {
          session.user.id = user.id
        }
        if (token?.user) {
          session.user.id = (token.user as { id: string }).id

          // handle when user get inactivated
          const u = await prisma.user.findFirst({
            where: {
              id: session.user.id,
              active: true
            },
            select: {
              id: true,
              name: true,
              email: true
            }
          })
          if (!u) throw new Error('Invalid session')
          session.user.name = u.name
          session.user.email = u.email
        }
      }
      return session
    },
    jwt({ token, user }) {
      user && (token.user = user)
      return token
    }
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter email'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter Password'
        }
      },
      async authorize(credentials) {
        if (!credentials) return null
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.username,
            active: true
          }
        })
        if (
          user &&
          user.password &&
          (await compare(credentials.password, user.password))
        ) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image
          }
        } else {
          return null
        }
      }
    })
  ]
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getAuthSession = () => getServerSession(authOptions)
