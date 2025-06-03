'use client'

import React, { useState } from 'react'
import ArtistSelection from '@/components/onboarding/artist-selection'

interface Artist {
  id: string
  name: string
  imageUrl: string
  genres: string[]
  popularity: number
}

export default function OnboardingPage() {
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const handleSelectionComplete = (artists: Artist[]) => {
    setSelectedArtists(artists)
    setIsComplete(true)
    console.log('選択されたアーティスト:', artists)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">完了！</h2>
            <p className="text-gray-600 mb-6">お疲れ様でした！選択したアーティスト:</p>
            <div className="space-y-2">
              {selectedArtists.map((artist, index) => (
                <div key={artist.id} className="text-left bg-orange-50 rounded-lg p-3">
                  <span className="font-medium">{index + 1}. {artist.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({artist.genres.join(', ')})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <ArtistSelection onSelectionComplete={handleSelectionComplete} />
} 