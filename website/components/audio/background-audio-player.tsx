'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BackgroundAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [autoPlayAttempted, setAutoPlayAttempted] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedData = () => {
      setDuration(audio.duration)
      setIsLoaded(true)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleCanPlay = () => {
      // Try to auto-play as soon as audio can play
      if (!autoPlayAttempted) {
        setAutoPlayAttempted(true)
        audio.play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            // Auto-play was prevented by browser policy
            console.log('Auto-play prevented:', error)
            setIsPlaying(false)
          })
      }
    }

    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('canplay', handleCanPlay)

    // Set initial volume
    audio.volume = volume

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('canplay', handleCanPlay)
    }
  }, [volume, autoPlayAttempted])

  // Additional auto-play attempt on component mount
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || autoPlayAttempted) return

    // Try auto-play after a short delay to ensure audio is ready
    const timer = setTimeout(() => {
      if (!autoPlayAttempted) {
        setAutoPlayAttempted(true)
        audio.play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            console.log('Auto-play blocked by browser, user will need to manually start')
          })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [autoPlayAttempted])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (audio.paused) {
        await audio.play()
        setIsPlaying(true)
      } else {
        audio.pause()
        setIsPlaying(false)
      }
    } catch (error) {
      console.log('Audio play failed:', error)
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      if (newVolume === 0) {
        setIsMuted(true)
        audioRef.current.muted = true
      } else if (isMuted) {
        setIsMuted(false)
        audioRef.current.muted = false
      }
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (parseFloat(e.target.value) / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/interstellar--imperial-orchestra.mp3"
        loop
        preload="auto"
        autoPlay
        muted={false}
        playsInline
      />

      {/* Mobile Slide-out player - Enhanced Design */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] md:hidden pointer-events-auto">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: isExpanded ? '0%' : 'calc(100% - 40px)' }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="flex items-center"
        >
          {/* Slide tab - Liquid Glass */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "flex items-center justify-center w-10 h-16 rounded-l-2xl",
              "bg-white/10 dark:bg-white/5",
              "backdrop-blur-2xl backdrop-saturate-150",
              "border border-white/30 dark:border-white/20",
              "shadow-2xl shadow-black/10 dark:shadow-black/30",
              "hover:bg-white/20 dark:hover:bg-white/10",
              "hover:border-white/40 dark:hover:border-white/30",
              "hover:shadow-3xl transition-all duration-500 ease-out",
              "group touch-manipulation active:scale-95",
              "before:absolute before:inset-0 before:rounded-l-2xl",
              "before:bg-gradient-to-br before:from-white/20 before:to-transparent",
              "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
              "relative overflow-hidden"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-target-cursor="true"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center justify-center z-10 relative"
            >
              <ChevronRight className="w-4 h-4 text-white/80 group-hover:text-white transition-colors drop-shadow-lg" />
            </motion.div>
          </motion.button>

          {/* Player content - Liquid Glass */}
          <div className={cn(
            "bg-white/10 dark:bg-white/5",
            "backdrop-blur-2xl backdrop-saturate-150",
            "border border-white/30 dark:border-white/20",
            "rounded-r-2xl shadow-2xl shadow-black/10 dark:shadow-black/30",
            "min-w-[200px] max-w-[280px]",
            "overflow-hidden relative",
            "before:absolute before:inset-0 before:rounded-r-2xl",
            "before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent",
            "before:pointer-events-none"
          )}>
            {/* Track info section */}
            <div className="px-4 py-3 border-b border-white/20 dark:border-white/10 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white/90 dark:text-white truncate drop-shadow-sm">
                    Interstellar
                  </div>
                  <div className="text-xs text-white/70 dark:text-white/60 drop-shadow-sm">
                    Background Music
                  </div>
                </div>
                {/* Status indicator */}
                <div className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  isPlaying 
                    ? "bg-green-400 shadow-lg shadow-green-400/60 animate-pulse" 
                    : "bg-white/40 dark:bg-white/30"
                )} />
              </div>
            </div>

            {/* Controls section */}
            <div className="px-4 py-3 relative z-10">
              <div className="flex items-center justify-between gap-3">
                {/* Play/Pause button - Liquid Glass */}
                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    togglePlay()
                  }}
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full",
                    "bg-white/20 dark:bg-white/10",
                    "backdrop-blur-xl backdrop-saturate-150",
                    "border border-white/40 dark:border-white/30",
                    "text-white shadow-2xl shadow-black/20",
                    "hover:bg-white/30 dark:hover:bg-white/20",
                    "hover:border-white/50 dark:hover:border-white/40",
                    "hover:shadow-3xl transition-all duration-300",
                    "active:scale-95 touch-manipulation",
                    "relative overflow-hidden",
                    "before:absolute before:inset-0 before:rounded-full",
                    "before:bg-gradient-to-br before:from-white/30 before:to-transparent",
                    "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={false}
                  type="button"
                  data-target-cursor="true"
                >
                  <div className="relative z-10">
                    {isPlaying ? (
                      <Pause className="w-5 h-5 drop-shadow-lg" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5 drop-shadow-lg" />
                    )}
                  </div>
                </motion.button>

                {/* Volume controls - Liquid Glass */}
                <div className="flex-1 flex items-center gap-3">
                  <motion.button
                    onClick={toggleMute}
                    className={cn(
                      "p-2 rounded-full transition-all duration-300",
                      "bg-white/10 dark:bg-white/5",
                      "backdrop-blur-lg border border-white/20 dark:border-white/10",
                      "text-white/80 hover:text-white",
                      "hover:bg-white/20 dark:hover:bg-white/10",
                      "hover:border-white/30 dark:hover:border-white/20",
                      "shadow-lg hover:shadow-xl",
                      "touch-manipulation active:scale-95"
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    data-target-cursor="true"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 drop-shadow-sm" />
                    ) : (
                      <Volume2 className="w-4 h-4 drop-shadow-sm" />
                    )}
                  </motion.button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-white/20 dark:bg-white/10 rounded-lg appearance-none cursor-pointer volume-slider audio-slider backdrop-blur-sm border border-white/20"
                    />
                    <div className="text-xs text-white/70 dark:text-white/60 text-center mt-1 font-mono drop-shadow-sm">
                      {Math.round(volume * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress section - Liquid Glass */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-4 py-3 border-t border-white/20 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm relative z-10"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/70 dark:text-white/60 font-mono min-w-[35px] drop-shadow-sm">
                      {formatTime(currentTime)}
                    </span>
                    <div className="flex-1 relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleProgressChange}
                        className="w-full h-2 bg-white/20 dark:bg-white/10 rounded-lg appearance-none cursor-pointer progress-slider audio-slider backdrop-blur-sm border border-white/20"
                      />
                    </div>
                    <span className="text-xs text-white/70 dark:text-white/60 font-mono min-w-[35px] text-right drop-shadow-sm">
                      {formatTime(duration)}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Desktop Slide-out player */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden md:block pointer-events-auto">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: isExpanded ? '0%' : 'calc(100% - 40px)' }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="flex items-center"
        >
          {/* Slide tab - Liquid Glass */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "flex items-center justify-center w-10 h-16 md:w-12 md:h-20 rounded-l-2xl",
              "bg-white/10 dark:bg-white/5",
              "backdrop-blur-2xl backdrop-saturate-150",
              "border border-white/30 dark:border-white/20 border-r-0",
              "shadow-2xl shadow-black/10 dark:shadow-black/30",
              "hover:bg-white/20 dark:hover:bg-white/10",
              "hover:border-white/40 dark:hover:border-white/30",
              "hover:shadow-3xl transition-all duration-500 ease-out",
              "group touch-manipulation active:scale-95",
              "before:absolute before:inset-0 before:rounded-l-2xl",
              "before:bg-gradient-to-br before:from-white/20 before:to-transparent",
              "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
              "relative overflow-hidden"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-target-cursor="true"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover:text-white transition-colors drop-shadow-lg" />
            </motion.div>
          </motion.button>

          {/* Player content - Liquid Glass */}
          <div className={cn(
            "bg-white/10 dark:bg-white/5",
            "backdrop-blur-2xl backdrop-saturate-150",
            "border border-white/30 dark:border-white/20 border-l-0",
            "rounded-r-2xl shadow-2xl shadow-black/10 dark:shadow-black/30",
            "min-w-[280px] md:min-w-[360px]",
            "relative overflow-hidden",
            "before:absolute before:inset-0 before:rounded-r-2xl",
            "before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent",
            "before:pointer-events-none"
          )}>
            {/* Track info section */}
            <div className="px-4 py-3 border-b border-white/20 dark:border-white/10 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-xs md:text-sm font-bold text-white/90 dark:text-white truncate drop-shadow-sm">
                    Interstellar
                  </div>
                  <div className="text-xs text-white/70 dark:text-white/60 drop-shadow-sm">
                    Background Music
                  </div>
                </div>
                {/* Status indicator */}
                <div className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  isPlaying 
                    ? "bg-green-400 shadow-lg shadow-green-400/60 animate-pulse" 
                    : "bg-white/40 dark:bg-white/30"
                )} />
              </div>
            </div>

            {/* Controls section */}
            <div className="px-4 py-3 relative z-10">
              <div className="flex items-center justify-between gap-3 md:gap-4">
                {/* Play/Pause button - Liquid Glass */}
                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    togglePlay()
                  }}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full",
                    "bg-white/20 dark:bg-white/10",
                    "backdrop-blur-xl backdrop-saturate-150",
                    "border border-white/40 dark:border-white/30",
                    "text-white shadow-2xl shadow-black/20",
                    "hover:bg-white/30 dark:hover:bg-white/20",
                    "hover:border-white/50 dark:hover:border-white/40",
                    "hover:shadow-3xl transition-all duration-300",
                    "active:scale-95 touch-manipulation",
                    "relative overflow-hidden",
                    "before:absolute before:inset-0 before:rounded-full",
                    "before:bg-gradient-to-br before:from-white/30 before:to-transparent",
                    "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={false}
                  type="button"
                  data-target-cursor="true"
                >
                  <div className="relative z-10">
                    {isPlaying ? (
                      <Pause className="w-4 h-4 md:w-5 md:h-5 drop-shadow-lg" />
                    ) : (
                      <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5 drop-shadow-lg" />
                    )}
                  </div>
                </motion.button>

                {/* Volume controls - Liquid Glass */}
                <div className="flex-1 flex items-center gap-3 md:gap-4">
                  <motion.button
                    onClick={toggleMute}
                    className={cn(
                      "p-2 rounded-full transition-all duration-300",
                      "bg-white/10 dark:bg-white/5",
                      "backdrop-blur-lg border border-white/20 dark:border-white/10",
                      "text-white/80 hover:text-white",
                      "hover:bg-white/20 dark:hover:bg-white/10",
                      "hover:border-white/30 dark:hover:border-white/20",
                      "shadow-lg hover:shadow-xl",
                      "touch-manipulation active:scale-95"
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 drop-shadow-sm" />
                    ) : (
                      <Volume2 className="w-4 h-4 drop-shadow-sm" />
                    )}
                  </motion.button>
                  
                  <div className="flex-1 relative max-w-[120px]">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-white/20 dark:bg-white/10 rounded-lg appearance-none cursor-pointer volume-slider audio-slider backdrop-blur-sm border border-white/20"
                    />
                    <div className="text-xs text-white/70 dark:text-white/60 text-center mt-1 font-mono drop-shadow-sm">
                      {Math.round(volume * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress section - Liquid Glass */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-4 py-3 border-t border-white/20 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm relative z-10"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/70 dark:text-white/60 font-mono min-w-[35px] drop-shadow-sm">
                      {formatTime(currentTime)}
                    </span>
                    <div className="flex-1 relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleProgressChange}
                        className="w-full h-2 bg-white/20 dark:bg-white/10 rounded-lg appearance-none cursor-pointer progress-slider audio-slider backdrop-blur-sm border border-white/20"
                      />
                    </div>
                    <span className="text-xs text-white/70 dark:text-white/60 font-mono min-w-[35px] text-right drop-shadow-sm">
                      {formatTime(duration)}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        /* Custom slider styles */
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #355381;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #355381;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .progress-slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #355381;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .progress-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #355381;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .dark .volume-slider::-webkit-slider-thumb {
          background: #82b2d7;
        }

        .dark .volume-slider::-moz-range-thumb {
          background: #82b2d7;
        }

        .dark .progress-slider::-webkit-slider-thumb {
          background: #82b2d7;
        }

        .dark .progress-slider::-moz-range-thumb {
          background: #82b2d7;
        }

        /* Track styles */
        .volume-slider::-webkit-slider-track {
          height: 4px;
          border-radius: 2px;
          background: linear-gradient(to right, #355381 0%, #355381 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%);
        }

        .progress-slider::-webkit-slider-track {
          height: 4px;
          border-radius: 2px;
          background: linear-gradient(to right, #355381 0%, #355381 ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%);
        }

        .dark .volume-slider::-webkit-slider-track {
          background: linear-gradient(to right, #82b2d7 0%, #82b2d7 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%);
        }

        .dark .progress-slider::-webkit-slider-track {
          background: linear-gradient(to right, #82b2d7 0%, #82b2d7 ${progress}%, #374151 ${progress}%, #374151 100%);
        }
      `}</style>
    </>
  )
}
