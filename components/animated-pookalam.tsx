"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface FlowerProps {
  color: string
  size: number
  delay: number
  isVisible: boolean
}

const Flower = ({ color, size, delay, isVisible }: FlowerProps) => (
  <div className={`absolute ${isVisible ? "flower-animate" : "opacity-0"}`} style={{ animationDelay: `${delay}ms` }}>
    <div className="relative">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: `${size * 0.8}px`,
            height: `${size * 0.35}px`,
            backgroundColor: color,
            borderRadius: "50%",
            left: `${size * 0.1}px`,
            top: `${size * 0.325}px`,
            transformOrigin: `${size * 0.4}px ${size * 0.175}px`,
            transform: `rotate(${i * 60}deg)`,
            boxShadow: `inset 0 0 ${size / 6}px rgba(0,0,0,0.2)`,
          }}
        />
      ))}
      <div
        className="absolute bg-yellow-300 rounded-full"
        style={{
          width: `${size * 0.25}px`,
          height: `${size * 0.25}px`,
          left: `${size * 0.375}px`,
          top: `${size * 0.375}px`,
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  </div>
)

const Daisy = ({ size, delay, isVisible }: { size: number; delay: number; isVisible: boolean }) => (
  <div className={`absolute ${isVisible ? "flower-animate" : "opacity-0"}`} style={{ animationDelay: `${delay}ms` }}>
    <div className="relative">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white"
          style={{
            width: `${size * 0.7}px`,
            height: `${size * 0.3}px`,
            borderRadius: "50%",
            left: `${size * 0.15}px`,
            top: `${size * 0.35}px`,
            transformOrigin: `${size * 0.35}px ${size * 0.15}px`,
            transform: `rotate(${i * 60}deg)`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        />
      ))}
      <div
        className="absolute bg-yellow-400 rounded-full"
        style={{
          width: `${size * 0.3}px`,
          height: `${size * 0.3}px`,
          left: `${size * 0.35}px`,
          top: `${size * 0.35}px`,
        }}
      />
    </div>
  </div>
)

export default function AnimatedPookalam() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentLayer, setCurrentLayer] = useState(0)

  const layers = [
    // Center circle - Orange core
    { flowers: 1, radius: 0, color: "#f97316", type: "center" as const, size: 20 },
    // Inner purple ring
    { flowers: 8, radius: 25, color: "#a855f7", type: "flower" as const, size: 8 },
    // Yellow ring
    { flowers: 12, radius: 40, color: "#fbbf24", type: "flower" as const, size: 10 },
    // Orange ring
    { flowers: 16, radius: 55, color: "#f97316", type: "flower" as const, size: 12 },
    // Inner white petals
    { flowers: 20, radius: 70, color: "#ffffff", type: "daisy" as const, size: 14 },
    // Red/pink inner petals
    { flowers: 24, radius: 85, color: "#dc2626", type: "flower" as const, size: 16 },
    // Green border of center
    { flowers: 28, radius: 100, color: "#16a34a", type: "flower" as const, size: 18 },
    // Extended circular layers - replacing petal extensions
    { flowers: 32, radius: 120, color: "#f97316", type: "flower" as const, size: 20 },
    { flowers: 36, radius: 140, color: "#fbbf24", type: "flower" as const, size: 22 },
    { flowers: 40, radius: 160, color: "#a855f7", type: "flower" as const, size: 24 },
    { flowers: 44, radius: 180, color: "#dc2626", type: "flower" as const, size: 26 },
    { flowers: 48, radius: 200, color: "#16a34a", type: "flower" as const, size: 28 },
  ]

  const startAnimation = () => {
    setIsAnimating(true)
    setCurrentLayer(0)

    layers.forEach((_, index) => {
      setTimeout(() => {
        setCurrentLayer(index + 1)
      }, index * 800)
    })
  }

  const resetAnimation = () => {
    setIsAnimating(false)
    setCurrentLayer(0)
  }

  return (
    <Card className="p-8 mb-12 bg-card">
      <div className="text-center mb-8">
        <Button
          onClick={isAnimating ? resetAnimation : startAnimation}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
        >
          {isAnimating ? "Reset Animation" : "Start Pookalam Animation"}
        </Button>
      </div>

      <div className="flex justify-center">
        <div className="relative w-[500px] h-[500px] bg-white rounded-full border-4 border-yellow-400">
          {layers.map((layer, layerIndex) => (
            <div key={layerIndex}>
              {layer.type === "center" ? (
                // Center circle
                <div
                  className={`absolute rounded-full ${isAnimating && currentLayer > layerIndex ? "flower-animate" : "opacity-0"}`}
                  style={{
                    width: `${layer.size}px`,
                    height: `${layer.size}px`,
                    backgroundColor: layer.color,
                    left: `${250 - layer.size / 2}px`,
                    top: `${250 - layer.size / 2}px`,
                    animationDelay: `${layerIndex * 800}ms`,
                  }}
                />
              ) : (
                [...Array(layer.flowers)].map((_, flowerIndex) => {
                  const angle = (flowerIndex * 360) / layer.flowers
                  const x = 250 + layer.radius * Math.cos((angle * Math.PI) / 180) - layer.size / 2
                  const y = 250 + layer.radius * Math.sin((angle * Math.PI) / 180) - layer.size / 2
                  const delay = layerIndex * 800 + flowerIndex * 100

                  return (
                    <div key={flowerIndex} className="absolute" style={{ left: `${x}px`, top: `${y}px` }}>
                      {layer.type === "daisy" ? (
                        <Daisy size={layer.size} delay={delay} isVisible={isAnimating && currentLayer > layerIndex} />
                      ) : (
                        <Flower
                          color={layer.color}
                          size={layer.size}
                          delay={delay}
                          isVisible={isAnimating && currentLayer > layerIndex}
                        />
                      )}
                    </div>
                  )
                })
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
