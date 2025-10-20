'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { IMAGES } from '../../constants'

const clients = [
  { 
    id: 1, 
    image: IMAGES[0], 
    name: 'Client 1', 
    location: 'Dubai, United Arab Emirates',
    subtitle: 'Quality Excellence'
  },
  { 
    id: 2, 
    image: IMAGES[1], 
    name: 'Flora Delight', 
    location: 'Started in 2017',
    subtitle: 'Beautiful gardens'
  },
  { 
    id: 3, 
    image: IMAGES[2], 
    name: 'Uhuru', 
    location: 'There\'s always something happening',
    subtitle: 'Experience Innovation'
  },
  { 
    id: 4, 
    image: IMAGES[3], 
    name: 'Client 4', 
    location: 'New York, USA',
    subtitle: 'New possibilities'
  },
  { 
    id: 5, 
    image: IMAGES[1], 
    name: 'Client 5', 
    location: 'Tokyo, Japan',
    subtitle: 'Amazing experiences'
  },
]

export function ClientsCarousel() {
  const [current, setCurrent] = useState(0)
  const [dragStartX, setDragStartX] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const next = () => {
    setIsAnimating(true)
    setCurrent((prev) => (prev + 1) % clients.length)
  }
  
  const prev = () => {
    setIsAnimating(true)
    setCurrent((prev) => (prev - 1 + clients.length) % clients.length)
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 100)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragStartX(x)
  }

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const x = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX
    const diff = dragStartX - x
    
    if (diff > 50) next()
    else if (diff < -50) prev()
    
    setDragStartX(0)
  }

  const getPosition = (index: number) => {
    let pos = index - current
    const half = Math.floor(clients.length / 2)
    
    if (pos > half) pos -= clients.length
    if (pos < -half) pos += clients.length
    
    return pos
  }

  const getStyles = (pos: number) => {
    if (Math.abs(pos) > 2) return { opacity: 0, transform: 'scale(0.5)', zIndex: -1 }

    const xOffset = isMobile ? 320 : 480
    const xFarOffset =  960

    const configs = {
      0: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, z: 10 },
      '-1': { x: -xOffset, y: 60, rotate: -18, scale: 1, opacity: 1, z: 5 },
      '1': { x: xOffset, y: 60, rotate: 18, scale: 1, opacity: 1, z: 5 },
      '-2': { x: -xFarOffset, y: 150, rotate: -36, scale: 1, opacity: 0, z: 0 },
      '2': { x: xFarOffset, y: 150, rotate: 36, scale: 1, opacity: 0, z: 0 },
    }

  const config = configs[pos.toString() as keyof typeof configs] || configs[0]
    
    return {
      transform: `translate(${config.x}px, ${config.y}px) rotate(${config.rotate}deg) scale(${config.scale})`,
      opacity: config.opacity,
      zIndex: config.z,
    }
  }

  const currentClient = clients[current]

  return (
    <section className="pb-16 md:pb-24 px-6 bg-[#FDFCF9] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Carousel Container */}
        <div
          className="relative h-[500px] mb-12 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {clients.map((client, index) => {
            const pos = getPosition(index)
            const isSide = Math.abs(pos) === 1

            return (
              <div
                key={client.id}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
                style={getStyles(pos)}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  if (isSide) pos === 1 ? next() : prev()
                }}
              >
                <div className={`w-64 h-80 md:w-72 md:h-96 rounded-2xl shadow-2xl overflow-hidden bg-white ${isSide ? 'cursor-pointer' : ''}`}>
                  <Image
                    src={client.image}
                    alt={client.name}
                    fill
                    className="object-cover pointer-events-none"
                    draggable={false}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Animated Client Info */}
        <div className="text-center relative h-32 overflow-hidden">
          <div key={current} className="space-y-2">
            <p className="text-sm md:text-base text-gray-500 opacity-0 client-slider-animate-text-enter client-slider-text-line-1">
              {currentClient.location}
            </p>
            <h3 className="text-xl md:text-2xl font-bold opacity-0 client-slider-animate-text-enter client-slider-text-line-2">
              {currentClient.name}
            </h3>
            <p className="text-base md:text-lg text-gray-600 opacity-0 client-slider-animate-text-enter client-slider-text-line-3">
              {currentClient.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}