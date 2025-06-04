import { AuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "user-read-email user-top-read user-read-recently-played playlist-read-private user-library-read"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.spotifyId = profile?.id
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken as string
      session.user.spotifyId = token.spotifyId as string
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/onboarding'
  }
} 