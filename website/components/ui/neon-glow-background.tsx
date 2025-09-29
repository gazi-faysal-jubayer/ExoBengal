"use client"
import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const NeonGlowBackground = React.memo(
  ({ className }: { className?: string }) => {
    return (
      <div
        className={cn(
          "absolute h-full w-full inset-0 overflow-hidden",
          className,
        )}
      >
        {/* Multiple layers of animated neon effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-purple-500/30 to-pink-500/30"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-violet-500/20 to-cyan-500/20"
          animate={{
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Pulsing border glow */}
        <motion.div
          className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg"
          animate={{
            boxShadow: [
              "0 0 20px rgba(34, 211, 238, 0.3)",
              "0 0 40px rgba(34, 211, 238, 0.8)",
              "0 0 20px rgba(34, 211, 238, 0.3)",
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated circuit lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          viewBox="0 0 400 400"
          fill="none"
        >
          <motion.path
            d="M0,200 L100,200 L100,100 L300,100 L300,300 L400,300"
            stroke="url(#neonGradient1)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M400,100 L300,100 L300,200 L100,200 L100,300 L0,300"
            stroke="url(#neonGradient2)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          
          <defs>
            <linearGradient id="neonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF" />
              <stop offset="50%" stopColor="#FF00FF" />
              <stop offset="100%" stopColor="#FFFF00" />
            </linearGradient>
            <linearGradient id="neonGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF00FF" />
              <stop offset="50%" stopColor="#00FFFF" />
              <stop offset="100%" stopColor="#00FF00" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating particles */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -50, 50, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 2, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    )
  },
)

NeonGlowBackground.displayName = "NeonGlowBackground"
