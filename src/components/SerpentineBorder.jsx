import { useEffect, useRef, useState } from 'react'

const N = 5
const STROKE_WIDTH = 5
const R = 28
const COLORS = ['#561d25', '#ce8147', '#ecdd7b', '#68b0ab', '#696d7d']

function buildPathD(W, Y) {
  const n = Y.length - 1
  if (n < 1 || W <= 0) return ''

  const parts = []
  for (let i = 0; i < N; i++) {
    const o = i * STROKE_WIDTH
    const r = R - o
    if (r <= 0) continue

    const segs = [
      `M ${W} ${o}`,
      `L ${R} ${o}`,
      `A ${r} ${r} 0 0 0 ${o} ${R}`,
    ]

    for (let t = 0; t < n - 1; t++) {
      const yCurr = Y[t + 1]
      const yNext = Y[t + 2]
      if (t % 2 === 0) {
        segs.push(`L ${o} ${yCurr - R}`)
        segs.push(`A ${r} ${r} 0 0 0 ${R} ${yCurr - o}`)
        segs.push(`L ${W - o - R} ${yCurr - o}`)
        segs.push(`A ${R} ${R} 0 0 1 ${W - o} ${yCurr - o + R}`)
        segs.push(`L ${W - o} ${yNext - R}`)
      } else {
        segs.push(`L ${W - o} ${yCurr - R}`)
        segs.push(`A ${r} ${r} 0 0 1 ${W - R} ${yCurr - o}`)
        segs.push(`L ${o + R} ${yCurr - o}`)
        segs.push(`A ${R} ${R} 0 0 0 ${o} ${yCurr - o + R}`)
        segs.push(`L ${o} ${yNext - R}`)
      }
    }

    const lastY = Y[n]
    if ((n - 2) % 2 === 0) {
      segs.push(`L ${W - o} ${lastY}`)
    } else {
      segs.push(`L ${o} ${lastY}`)
    }

    parts.push({ d: segs.join(' '), color: COLORS[i] })
  }
  return parts
}

function SerpentineBorder({ children }) {
  const wrapperRef = useRef(null)
  const [paths, setPaths] = useState([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const measure = () => {
      const sections = wrapper.querySelectorAll('.section')
      if (sections.length === 0) return

      const rect = wrapper.getBoundingClientRect()
      const W = rect.width
      const Y = [0]
      for (let i = 0; i < sections.length; i++) {
        const r = sections[i].getBoundingClientRect()
        Y.push((r.top - rect.top) + r.height)
      }
      const totalHeight = Y[Y.length - 1]
      setDimensions({ width: W, height: totalHeight })
      setPaths(buildPathD(W, Y))
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(wrapper)

    return () => ro.disconnect()
  }, [children])

  return (
    <div ref={wrapperRef} className="serpentine-wrapper">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <svg
            className="serpentine-border-svg"
            viewBox={`${-STROKE_WIDTH / 2} ${-STROKE_WIDTH / 2} ${dimensions.width + STROKE_WIDTH} ${dimensions.height + STROKE_WIDTH}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {paths.map(({ d, color }, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={STROKE_WIDTH}
              />
            ))}
          </svg>
      )}
      {children}
    </div>
  )
}

export default SerpentineBorder
