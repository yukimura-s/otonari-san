import { DefaultSession } from "next-auth"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      spotifyId?: string
    } & DefaultSession["user"]
  }

  interface JWT {
    accessToken?: string
    refreshToken?: string
    spotifyId?: string
  }

  interface Profile {
    id?: string
  }
} 