'use client'
import { useState, useEffect, useRef, ReactNode } from 'react'
import Image from 'next/image'
import { IMAGES } from '../../constants'

const slides = IMAGES.map((item, index) => ({
  id: index,
  image: item,
  thumb: item
}))

const SIZE = 100
const STROKE_WIDTH = 2
const RADIUS = (SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function HeroSection({children}:{children:ReactNode}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleNext = () => {
    if (previousIndex !== null) return
    setPreviousIndex(activeIndex)
    setActiveIndex((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }

  const handleAnimationEnd = () => {
    setPreviousIndex(null)
  }

  useEffect(() => {
    if (previousIndex !== null) return

    const startTime = Date.now()
    const duration = 5500

    const animate = () => {
      const elapsed = Date.now() - startTime
      const newProgress = (elapsed / duration) * 100

      if (newProgress >= 100) {
        handleNext()
      } else {
        setProgress(newProgress)
        timerRef.current = setTimeout(animate, 16)
      }
    }

    animate()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, previousIndex])

  const activeSlide = slides[activeIndex]
  const previousSlide = previousIndex !== null ? slides[previousIndex] : null
  const nextSlideThumb = slides[(activeIndex + 1) % slides.length].thumb

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        {previousSlide && (
          <div key={previousIndex} className="absolute inset-0">
            <Image
              src={previousSlide.image}
              alt="Previous slide"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )}

        <div
          key={activeIndex}
          className="absolute inset-0"
          style={{
            ...(previousIndex !== null && {
              zIndex: 2,
              animation: 'verticalWipe 1.5s ease-in-out forwards',
            }),
          }}
          onAnimationEnd={handleAnimationEnd}
        >
          <Image
            src={activeSlide.image}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

     {children}

      {/* Controls */}
      <div className="absolute bottom-8 left-6 md:left-16 z-20 flex items-end gap-3 md:gap-4">
        <button
          onClick={handleNext}
          disabled={previousIndex !== null}
          className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="white"
              strokeWidth={STROKE_WIDTH}
              opacity={0.3}
            />
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="white"
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100}
              strokeLinecap="round"
              style={{ transition: 'none' }}
            />
          </svg>

          <div className="absolute cursor-pointer inset-2 overflow-hidden rounded-full">
            <Image
              src={nextSlideThumb}
              alt="Next slide preview"
              fill
              className="object-cover"
            />
          </div>
        </button>

        <button
          onClick={handleNext}
          disabled={previousIndex !== null}
          className="hidden md:flex items-center gap-2 text-white text-sm hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2 md:gap-3 text-white text-sm md:text-base">
          <span>0{activeIndex + 1}</span>
          <div className="hidden md:block w-16 md:w-20 h-px bg-white/30 relative">
            <div
              className="absolute left-0 top-0 h-full bg-white transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
            />
          </div>
          <span>0{slides.length}</span>
        </div>
      </div>
    </section>
  )
}