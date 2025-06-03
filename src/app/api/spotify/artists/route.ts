import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getSpotifyApi } from '@/lib/spotify'

export async function GET(request: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const spotifyApi = await getSpotifyApi(session.accessToken)
    const topArtists = await spotifyApi.getTopArtists('medium_term', 50)
    
    // アーティストデータを統一形式に変換
    const artists = topArtists.items.map((artist, index) => ({
      id: artist.id,
      name: artist.name,
      imageUrl: artist.images[0]?.url || '',
      genres: artist.genres,
      popularity: artist.popularity,
      rank: index + 1,
      followers: artist.followers.total
    }))

    return NextResponse.json({ artists })
  } catch (error) {
    console.error('Spotify API error:', error)
    return NextResponse.json({ error: 'Failed to fetch artists' }, { status: 500 })
  }
} 