'use client'

import React, { useState, useEffect } from 'react'
import { Check, Music, Search, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useSession } from 'next-auth/react'

interface Artist {
  id: string
  name: string
  imageUrl: string
  genres: string[]
  popularity: number
}

interface ArtistSelectionProps {
  onSelectionComplete: (selectedArtists: Artist[]) => void
}

export default function ArtistSelection({ onSelectionComplete }: ArtistSelectionProps) {
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [artists, setArtists] = useState<Artist[]>([])
  const { theme } = useTheme()
  const { data: session } = useSession()

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('/api/spotify/artists')
        if (!response.ok) {
          throw new Error('アーティストデータの取得に失敗しました')
        }
        const data = await response.json()
        setArtists(data.artists)
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました')
      } finally {
        setIsLoading(false)
      }
    }

    if (session?.accessToken) {
      fetchArtists()
    }
  }, [session])

  const filteredArtists = artists.filter((artist: Artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artist.genres.some((genre: string) => genre.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const toggleArtist = (artist: Artist) => {
    if (selectedArtists.find((a: Artist) => a.id === artist.id)) {
      setSelectedArtists(selectedArtists.filter((a: Artist) => a.id !== artist.id))
    } else if (selectedArtists.length < 5) {
      setSelectedArtists([...selectedArtists, artist])
    }
  }

  const isSelected = (artistId: string) => {
    return selectedArtists.some((a: Artist) => a.id === artistId)
  }

  const canProceed = selectedArtists.length >= 3

  // アニメーションのバリエーション
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">アーティスト情報を読み込み中...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => setError(null)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            再試行
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            好きなアーティストを選んでね
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            最低3人、最大5人まで選択できます ({selectedArtists.length}/5)
          </p>
        </div>

        {/* 検索バー */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="アーティスト名やジャンルで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-orange-400 dark:focus:border-orange-500 focus:outline-none text-lg transition-colors bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
          />
        </div>

        {/* アーティストグリッド */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"
        >
          <AnimatePresence>
            {filteredArtists.map((artist) => (
              <motion.div
                key={artist.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative cursor-pointer group transition-all duration-300 ${
                  isSelected(artist.id) 
                    ? 'ring-4 ring-orange-400 dark:ring-orange-500 ring-offset-2 dark:ring-offset-gray-900' 
                    : selectedArtists.length >= 5 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:shadow-lg dark:hover:shadow-orange-500/20'
                }`}
                onClick={() => toggleArtist(artist)}
                role="button"
                aria-pressed={isSelected(artist.id)}
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleArtist(artist)
                  }
                }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md transition-shadow">
                  {/* アーティスト画像 */}
                  <div className="relative mb-3">
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-orange-200 to-amber-200 dark:from-orange-900 dark:to-amber-900">
                      {artist.imageUrl ? (
                        <img
                          src={artist.imageUrl}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-orange-600 dark:text-orange-400">
                          <Music className="w-12 h-12" />
                        </div>
                      )}
                    </div>
                    {isSelected(artist.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-orange-500 dark:bg-orange-600 rounded-full p-1"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* アーティスト情報 */}
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {artist.genres.join(', ')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 選択されたアーティスト表示 */}
        {selectedArtists.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 dark:text-gray-300">
                  選択済み: {selectedArtists.length}人
                </span>
                <div className="flex -space-x-2">
                  {selectedArtists.map((artist) => (
                    <div
                      key={artist.id}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden"
                    >
                      {artist.imageUrl ? (
                        <img
                          src={artist.imageUrl}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                          <Music className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onSelectionComplete(selectedArtists)}
                disabled={!canProceed}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  canProceed
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                次へ進む
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 