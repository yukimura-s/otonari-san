export interface SpotifyArtist {
  id: string
  name: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  genres: string[]
  popularity: number
  followers: {
    total: number
  }
}

export interface SpotifyTopArtistsResponse {
  items: SpotifyArtist[]
  total: number
  limit: number
  offset: number
  href: string
  next: string | null
  previous: string | null
}

export class SpotifyApi {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  private async fetchSpotify(endpoint: string) {
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`)
    }

    return response.json()
  }

  async getTopArtists(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit: number = 20): Promise<SpotifyTopArtistsResponse> {
    return this.fetchSpotify(`/me/top/artists?time_range=${timeRange}&limit=${limit}`)
  }

  async getUserProfile() {
    return this.fetchSpotify('/me')
  }

  async getRecentlyPlayed(limit: number = 20) {
    return this.fetchSpotify(`/me/player/recently-played?limit=${limit}`)
  }

  async searchArtists(query: string, limit: number = 20) {
    const encodedQuery = encodeURIComponent(query)
    return this.fetchSpotify(`/search?q=${encodedQuery}&type=artist&limit=${limit}`)
  }
}

// サーバーサイドでSpotify APIを呼び出すためのヘルパー関数
export async function getSpotifyApi(accessToken: string) {
  return new SpotifyApi(accessToken)
} 