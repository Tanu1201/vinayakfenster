import { prisma } from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
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
    session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id
        }
      }
    }
  },
  adapter: PrismaAdapter(prisma),
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
        const isNum = !isNaN(Number(credentials.username))
        const user = await prisma.user.findFirst({
          where: {
            email: !isNum ? credentials.username : undefined,
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
