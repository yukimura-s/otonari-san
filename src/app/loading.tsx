'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Music, HeadphonesIcon, Radio } from 'lucide-react'

export default function Loading() {
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
      transition: { duration: 0.5 }
    }
  }

  const musicVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  const waveVariants = {
    animate: {
      scaleY: [1, 2, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        {/* メインローディングアイコン */}
        <motion.div className="mb-8 flex justify-center space-x-4">
          <motion.div
            variants={musicVariants}
            animate="animate"
            className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-full"
          >
            <Music className="w-10 h-10 text-orange-500" />
          </motion.div>
          
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full"
          >
            <HeadphonesIcon className="w-10 h-10 text-amber-500" />
          </motion.div>
          
          <motion.div
            animate={{
              y: [-5, 5, -5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-full"
          >
            <Radio className="w-10 h-10 text-orange-500" />
          </motion.div>
        </motion.div>

        {/* ローディングテキスト */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            おとなりさん
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            音楽でつながる瞬間を準備中...
          </p>
        </motion.div>

        {/* 音波アニメーション */}
        <motion.div variants={itemVariants} className="flex justify-center space-x-1 mb-8">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              variants={waveVariants}
              animate="animate"
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1
              }}
              className="w-1 h-8 bg-gradient-to-t from-orange-400 to-amber-400 rounded-full"
              style={{
                transformOrigin: 'bottom'
              }}
            />
          ))}
        </motion.div>

        {/* プログレスバー */}
        <motion.div variants={itemVariants} className="w-64 mx-auto">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </motion.div>

        {/* ローディングメッセージ */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-sm text-gray-500 dark:text-gray-400"
        >
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            素敵な音楽体験をお届けします...
          </motion.p>
        </motion.div>

        {/* 背景装飾 */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-200 dark:bg-orange-800/20 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
} 