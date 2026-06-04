'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

interface SplineSceneProps {
  scene: string
  className?: string
}

function SplineCanvas({ scene, className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let disposed = false

    // Size canvas to match its CSS container before loading
    const resize = () => {
      if (!canvas.parentElement) return
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    import('@splinetool/runtime').then(({ Application }) => {
      if (disposed) return
      const app = new Application(canvas)
      app.load(scene)
    })

    return () => {
      disposed = true
      ro.disconnect()
    }
  }, [scene])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}

const SplineScene = dynamic(() => Promise.resolve(SplineCanvas), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="loader" />
    </div>
  ),
})

export { SplineScene }
