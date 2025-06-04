import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getSpotifyApi } from '@/lib/spotify'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // セッションからアクセストークンを取得（型アサーション）
    const accessToken = (session as any).accessToken as string
    
    if (!accessToken) {
      return NextResponse.json({ error: 'No access token found' }, { status: 401 })
    }

    const spotifyApi = await getSpotifyApi(accessToken)
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
    return NextResponse.json({ 
      error: 'Failed to fetch artists',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 