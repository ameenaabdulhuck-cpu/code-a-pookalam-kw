"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function PookalamCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState("#ff6b35")
  const [brushSize, setBrushSize] = useState(5)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 400
    canvas.height = 400

    // Draw the golden circle border
    ctx.strokeStyle = "#f59e0b"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(200, 200, 180, 0, 2 * Math.PI)
    ctx.stroke()

    // Add some initial flower patterns
    drawInitialPattern(ctx)
  }, [])

  const drawInitialPattern = (ctx: CanvasRenderingContext2D) => {
    // Draw center circle
    ctx.fillStyle = "#fbbf24"
    ctx.beginPath()
    ctx.arc(200, 200, 20, 0, 2 * Math.PI)
    ctx.fill()

    // Draw petal-like shapes around center
    const petals = 8
    for (let i = 0; i < petals; i++) {
      const angle = (i * 2 * Math.PI) / petals
      const x = 200 + Math.cos(angle) * 60
      const y = 200 + Math.sin(angle) * 60

      ctx.fillStyle = i % 2 === 0 ? "#f97316" : "#dc2626"
      ctx.beginPath()
      ctx.arc(x, y, 15, 0, 2 * Math.PI)
      ctx.fill()
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if drawing within the circle
    const centerX = 200
    const centerY = 200
    const radius = 180
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)

    if (distance <= radius) {
      ctx.fillStyle = currentColor
      ctx.beginPath()
      ctx.arc(x, y, brushSize, 0, 2 * Math.PI)
      ctx.fill()

      // Update progress
      setProgress((prev) => Math.min(prev + 0.5, 100))
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const resetCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Redraw the border and initial pattern
    ctx.strokeStyle = "#f59e0b"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(200, 200, 180, 0, 2 * Math.PI)
    ctx.stroke()

    drawInitialPattern(ctx)
    setProgress(0)
  }

  const colors = ["#ff6b35", "#f59e0b", "#dc2626", "#7c3aed", "#059669", "#db2777"]

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Canvas */}
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="border-2 border-gray-200 rounded-full cursor-crosshair bg-gray-50"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Choose Colors</h3>
            <div className="grid grid-cols-3 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    currentColor === color ? "border-gray-800 scale-110" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentColor(color)}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Brush Size</h3>
            <input
              type="range"
              min="2"
              max="15"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-600 mt-1">Size: {brushSize}px</div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => {
                /* Create Pookalam functionality */
              }}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              🌸 Create Pookalam
            </Button>
            <Button onClick={resetCanvas} variant="outline" className="w-full bg-transparent">
              🔄 Reset
            </Button>
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-2">Ready to begin</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
