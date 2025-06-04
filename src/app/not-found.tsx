'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Music, Search, ArrowLeft, HeadphonesIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function NotFound() {
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

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-2xl mx-auto"
      >
        {/* 浮遊する音楽アイコン */}
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="mb-8 flex justify-center space-x-4"
        >
          <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
            <Music className="w-8 h-8 text-orange-500" />
          </div>
          <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
            <HeadphonesIcon className="w-8 h-8 text-amber-500" />
          </div>
        </motion.div>

        {/* メイン404表示 */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto rounded-full mb-6"></div>
        </motion.div>

        {/* メッセージ */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ページが見つかりません
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            音楽でつながる新しい出会いを見つけに戻りましょう！
          </p>
        </motion.div>

        {/* アクションボタン */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              ホームに戻る
            </motion.button>
          </Link>
          
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-full shadow-lg hover:shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300"
            >
              <Music className="w-5 h-5 mr-2" />
              ダッシュボード
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
              className="w-2 h-8 bg-gradient-to-t from-orange-400 to-amber-400 rounded-full"
            />
          ))}
        </motion.div>

        {/* フッターメッセージ */}
        <motion.div variants={itemVariants} className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>困ったときは、音楽が道を示してくれるはず🎵</p>
        </motion.div>
      </motion.div>

      {/* 背景装飾 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-orange-200 dark:bg-orange-800/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
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