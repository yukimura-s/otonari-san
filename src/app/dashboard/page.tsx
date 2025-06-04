'use client'

import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Music, Heart, Users, MessageCircle, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">おとなりさん</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {session.user?.image && (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || ''} 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-gray-700">{session.user?.name}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>ログアウト</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            おかえりなさい、{session.user?.name}さん！
          </h2>
          <p className="text-gray-600">今日も素敵な音楽体験を楽しみましょう</p>
        </div>

        {/* クイックアクション */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            href="/onboarding"
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Music className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">アーティスト選択</h3>
            <p className="text-gray-600 text-sm">好きなアーティストを選んでマッチングを始めよう</p>
          </Link>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">マッチング</h3>
            <p className="text-gray-600 text-sm">音楽の趣味が合う友達を見つけよう</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">チャット</h3>
            <p className="text-gray-600 text-sm">友達と音楽について語り合おう</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">コミュニティ</h3>
            <p className="text-gray-600 text-sm">同じ趣味の仲間とつながろう</p>
          </div>
        </div>

        {/* おすすめセクション */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">あなたにおすすめの友達</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">A</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">匿名ユーザー</p>
                  <p className="text-sm text-gray-600">共通アーティスト: 5人</p>
                </div>
              </div>
              <div className="text-center py-8 text-gray-500">
                <Music className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>まずはアーティスト選択から始めましょう</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">最近のアクティビティ</h3>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>まだアクティビティがありません</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 