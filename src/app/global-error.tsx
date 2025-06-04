'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Home, RefreshCw, AlertCircle, Music } from 'lucide-react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
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

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-100 via-red-50 to-orange-50 dark:from-gray-900 dark:via-red-900/10 dark:to-gray-800 flex items-center justify-center p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-lg mx-auto"
          >
            {/* 重大エラーアイコン */}
            <motion.div
              variants={pulseVariants}
              animate="pulse"
              className="mb-8 flex justify-center"
            >
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full border-4 border-red-200 dark:border-red-800">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
            </motion.div>

            {/* メインエラー表示 */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-red-500 mb-4">
                システムエラー
              </h1>
              <div className="w-20 h-1 bg-red-500 mx-auto rounded-full mb-6"></div>
            </motion.div>

            {/* メッセージ */}
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                重大なエラーが発生しました
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                アプリケーションで予期しない問題が発生し、復旧できませんでした。
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                おとなりさんチームにエラーが報告されました。ご迷惑をおかけして申し訳ありません。
              </p>
            </motion.div>

            {/* アクションボタン */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4 justify-center items-center">
              <motion.button
                onClick={reset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                アプリを再起動
              </motion.button>
              
              <motion.button
                onClick={() => window.location.href = '/'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-full shadow-lg border-2 border-gray-200 dark:border-gray-700 transition-all duration-300"
              >
                <Home className="w-5 h-5 mr-2" />
                ホームページへ
              </motion.button>
            </motion.div>

            {/* 装飾的な要素 */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex justify-center space-x-6 opacity-20"
            >
              <Music className="w-6 h-6 text-red-400" />
              <div className="w-6 h-1 bg-red-400 rounded-full self-center"></div>
              <Music className="w-6 h-6 text-red-400" />
            </motion.div>

            {/* フッターメッセージ */}
            <motion.div variants={itemVariants} className="mt-6 text-xs text-gray-400 dark:text-gray-500">
              <p>Error ID: {error.digest || 'Unknown'}</p>
            </motion.div>
          </motion.div>
        </div>
      </body>
    </html>
  )
} 