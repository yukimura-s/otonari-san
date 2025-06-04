import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getSpotifyApi } from '@/lib/spotify'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    console.log('Spotify API呼び出し開始...')
    
    const session = await getServerSession(authOptions)
    console.log('取得したセッション:', session)
    
    if (!session) {
      console.log('セッションが見つかりません')
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // セッションからアクセストークンを取得（型アサーション）
    const accessToken = (session as any).accessToken as string
    console.log('アクセストークン:', accessToken ? 'あり' : 'なし')
    
    if (!accessToken) {
      console.log('アクセストークンが見つかりません')
      return NextResponse.json({ error: 'No access token found' }, { status: 401 })
    }

    console.log('Spotify API呼び出し中...')
    const spotifyApi = await getSpotifyApi(accessToken)
    const topArtists = await spotifyApi.getTopArtists('medium_term', 50)
    console.log('Spotify APIレスポンス:', topArtists.items?.length, '件のアーティスト')
    
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

    console.log('変換完了:', artists.length, '件のアーティスト')
    return NextResponse.json({ artists })
  } catch (error) {
    console.error('Spotify API error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch artists',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 