import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      spotifyId?: string
      accessToken?: string
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