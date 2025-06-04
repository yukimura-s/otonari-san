'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Music, RefreshCw, AlertTriangle, HeadphonesIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const { theme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const shakeVariants = {
    shake: {
      x: [-5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-red-900/20 dark:to-gray-900 flex items-center justify-center p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-2xl mx-auto"
      >
        {/* エラーアイコン */}
        <motion.div
          variants={shakeVariants}
          animate="shake"
          className="mb-8 flex justify-center space-x-4"
        >
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
            <Music className="w-8 h-8 text-orange-500" />
          </div>
        </motion.div>

        {/* メインエラー表示 */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500 mb-4">
            エラー
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-500 mx-auto rounded-full mb-6"></div>
        </motion.div>

        {/* メッセージ */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            何かがうまくいきませんでした
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
            サーバーで予期せぬエラーが発生しました。
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            音楽は一時停止中ですが、すぐに復旧します！
          </p>
          
          {/* エラー詳細（開発環境のみ） */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                エラー詳細
              </summary>
              <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </motion.div>

        {/* アクションボタン */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            再試行
          </motion.button>
          
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-full shadow-lg hover:shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              ホームに戻る
            </motion.button>
          </Link>
        </motion.div>

        {/* 装飾的な要素 */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center space-x-8 opacity-30"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
              className="w-2 h-8 bg-gradient-to-t from-red-400 to-orange-400 rounded-full"
            />
          ))}
        </motion.div>

        {/* フッターメッセージ */}
        <motion.div variants={itemVariants} className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>技術的な問題が発生しました。しばらくお待ちください 🔧</p>
        </motion.div>
      </motion.div>

      {/* 背景装飾 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-red-200 dark:bg-red-800/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </div>
  )
} 