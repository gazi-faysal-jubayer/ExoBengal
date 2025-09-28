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
      
      // Auto-play when audio is loaded (only attempt once)
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

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    // Set initial volume
    audio.volume = volume

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [volume, autoPlayAttempted])

  // Auto-play attempt only on initial load (removed global click listener)
  useEffect(() => {
    const tryInitialAutoPlay = () => {
      const audio = audioRef.current
      if (!audio || autoPlayAttempted) return
      
      setAutoPlayAttempted(true)
      audio.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          // Auto-play blocked, user will need to manually start
          console.log('Auto-play blocked by browser, user must manually start')
        })
    }

    if (isLoaded && !autoPlayAttempted) {
      tryInitialAutoPlay()
    }
  }, [isLoaded, autoPlayAttempted])

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
      />

      {/* Mobile Compact Slider */}
      <div className="fixed bottom-4 right-4 z-[100] md:hidden pointer-events-auto">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isPlaying ? 1 : 0,
            opacity: isPlaying ? 1 : 0
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
          className="relative"
        >
          <div className={cn(
            "bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-xl",
            "border border-light-border dark:border-dark-border",
            "rounded-full px-3 py-2 flex items-center gap-2 shadow-lg",
            "min-w-[140px]"
          )}>
            {/* Compact play/pause button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                togglePlay()
              }}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full",
                "bg-primary-dark-blue dark:bg-primary-light-blue",
                "text-white dark:text-dark-background",
                "hover:bg-primary-very-dark-blue dark:hover:bg-primary-cyan",
                "transition-colors duration-200",
                "touch-manipulation shadow-md",
                "relative z-10 cursor-pointer flex-shrink-0"
              )}
              disabled={false}
              type="button"
            >
              {isPlaying ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3 ml-0.5" />
              )}
            </button>

            {/* Compact track info */}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-light-text-primary dark:text-dark-text-primary truncate">
                Interstellar
              </div>
            </div>

            {/* Volume control */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleMute()
              }}
              className="p-1 rounded-full text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-dark-blue dark:hover:text-primary-light-blue transition-colors touch-manipulation flex-shrink-0"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3 h-3" />
              ) : (
                <Volume2 className="w-3 h-3" />
              )}
            </button>

            {/* Close button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const audio = audioRef.current
                if (audio) {
                  audio.pause()
                  setIsPlaying(false)
                }
              }}
              className="p-1 rounded-full text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-reddish-orange transition-colors touch-manipulation flex-shrink-0"
            >
              <X className="w-3 h-3" />
            </button>
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
          {/* Slide tab */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "flex items-center justify-center w-10 h-16 md:w-12 md:h-20 rounded-l-lg",
              "audio-player-tab audio-player-glass cursor-pointer transition-all duration-300",
              "hover:shadow-lg group border-r-0 backdrop-blur-xl",
              "touch-manipulation"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-primary-dark-blue dark:group-hover:text-primary-light-blue" />
            </motion.div>
          </motion.button>

          {/* Player content */}
          <div className={cn(
            "audio-player-glass h-16 md:h-20 flex items-center gap-2 md:gap-4 px-2 md:px-6 rounded-r-lg",
            "border-l-0 min-w-[240px] md:min-w-[320px]",
            "backdrop-blur-xl"
          )}>
            {/* Track info */}
            <div className="flex-1 min-w-0">
              <div className="text-xs md:text-sm font-semibold text-light-text-primary dark:text-dark-text-primary truncate">
                Interstellar
              </div>
              <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary hidden md:block">
                Background Music
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
              {/* Play/Pause */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  togglePlay()
                }}
                className={cn(
                  "flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full",
                  "bg-primary-dark-blue dark:bg-primary-light-blue",
                  "text-white dark:text-dark-background",
                  "hover:bg-primary-very-dark-blue dark:hover:bg-primary-cyan",
                  "transition-colors duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "touch-manipulation",
                  "relative z-10",
                  "cursor-pointer"
                )}
                disabled={false}
                type="button"
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <Play className="w-3 h-3 md:w-4 md:h-4 ml-0.5" />
                )}
              </button>

              {/* Volume */}
              <div className="flex items-center gap-1 md:gap-2">
                <motion.button
                  onClick={toggleMute}
                  className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-dark-blue dark:hover:text-primary-light-blue transition-colors touch-manipulation"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
                  )}
                </motion.button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-10 md:w-16 h-1 bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer volume-slider audio-slider"
                />
              </div>
            </div>

            {/* Progress bar (when expanded) */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center gap-2 ml-2"
                >
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary font-mono">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    className="w-16 sm:w-20 h-1 bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer progress-slider audio-slider"
                  />
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary font-mono">
                    {formatTime(duration)}
                  </span>
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
