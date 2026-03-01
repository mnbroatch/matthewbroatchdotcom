import { useEffect, useRef, useState } from 'react'

const N = 5
const STROKE_WIDTH = 5
const R = 28
const MID_CURVE_INDEX = 2
const COLORS = ['#561d25', '#ce8147', '#ecdd7b', '#68b0ab', '#696d7d']

/** Section background colors (same order as sections in App) for fake corner triangles */
const SECTION_BG_COLORS = [
  '#7b2cbf',                      // dialogue
  'rgba(255, 107, 53, 0.95)',     // board
  'rgba(0, 212, 255, 0.94)',      // reply-guy
  'rgba(255, 0, 110, 0.94)',      // music
  '#696d7d',                      // experience
]

function getCurveEndpoints(W, yCurr, t) {
  const o = MID_CURVE_INDEX * STROKE_WIDTH
  if (t % 2 === 0) {
    return { leftY: yCurr - R, rightY: yCurr - o + R }
  }
  return { leftY: yCurr - o + R, rightY: yCurr - R }
}

/** Triangles to fake the curve at each boundary: fill corners with section bg color. */
function buildTriangles(W, Y, sectionCount) {
  const n = sectionCount
  if (n < 2 || W <= 0 || Y.length < 2) return []
  const o = MID_CURVE_INDEX * STROKE_WIDTH
  const triangles = []
  for (let i = 0; i < n - 1; i++) {
    const y = Y[i + 1]
    const { leftY, rightY } = getCurveEndpoints(W, y, i)
    const color = SECTION_BG_COLORS[i] ?? SECTION_BG_COLORS[0]
    triangles.push({
      points: `0,${y} ${o},${y} ${o},${leftY}`,
      color,
    })
    triangles.push({
      points: `${W},${y} ${W - o},${y} ${W - o},${rightY}`,
      color,
    })
  }
  return triangles
}

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
        segs.push(`A ${r} ${r} 0 0 0 ${o} ${yCurr - o + R}`)
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
  const [triangles, setTriangles] = useState([])
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
      setTriangles(buildTriangles(W, Y, sections.length))
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(wrapper)

    return () => ro.disconnect()
  }, [children])

  return (
    <div ref={wrapperRef} className="serpentine-wrapper">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <>
          <svg
            className="serpentine-triangles-svg"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {triangles.map(({ points, color }, i) => (
              <polygon key={i} points={points} fill={color} />
            ))}
          </svg>
          <svg
            className="serpentine-border-svg"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
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
        </>
      )}
      {children}
    </div>
  )
}

export default SerpentineBorder
