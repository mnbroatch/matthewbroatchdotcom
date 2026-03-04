import { useEffect, useRef, useState } from 'react'
// Vertical SVG offset: choose so that SVG y-coordinates used for
// section junctions (the Y[] values) map 1:1 to wrapper coordinates.
// With viewBox y-origin at -2 * STROKE_WIDTH, setting TOP_OFFSET to
// 2 * STROKE_WIDTH makes screenY == svgY for all Y-based math below.
// Shift so the horizontal band at each turn is centered on the section junction (yCurr)
// Shift applied only to the top entry arc so the middle stripe's first horizontal
// is at Y[0]; junction math is unchanged. Equals (middle stripe's o) + Y_OFFSET.

function buildPathD(W, Y, N, R, STROKE_WIDTH, COLORS, TOP_ARC_SHIFT, Y_OFFSET, O_TOTAL) {
  const R1 = STROKE_WIDTH * (N - 1)
  const RIGHT_EXTEND = STROKE_WIDTH / 2
  const n = Y.length - 1
  if (n < 1 || W <= 0) return ''
  const Wr = W + RIGHT_EXTEND
  const parts = []
  for (let i = 0; i < N; i++) {
    const o = i * STROKE_WIDTH
    const j = N - 1 - i
    const oj = j * STROKE_WIDTH
    const r  = R - o   // radius when stripe i is the outer/reference stripe
    const rj = R - oj  // radius when stripe i is the inner/flipped stripe
    const r1  = R1 - o   // radius when stripe i is the outer/reference stripe
    const rj1 = R1 - oj  // radius when stripe i is the inner/flipped stripe
    if (r <= 0 || rj <= 0) continue

    // yExit: the y-coordinate where arc-2 exits at each turn
    // Derived: cy = yCurr + R - O_TOTAL (fixed for all stripes at any turn)
    // so exit y = cy = yCurr + R - O_TOTAL

    const yCurrTop = O_TOTAL + Y_OFFSET
    const segs = [
      `M ${Wr - oj} ${yCurrTop - R1 - STROKE_WIDTH / 2 - TOP_ARC_SHIFT}`,
      `L ${Wr - oj} ${yCurrTop - R1 - TOP_ARC_SHIFT}`,
      `A ${rj1} ${rj1} 0 0 1 ${Wr - R1} ${yCurrTop - oj - TOP_ARC_SHIFT}`,
      `L ${R} ${o + Y_OFFSET - TOP_ARC_SHIFT}`,
      `A ${r} ${r} 0 0 0 ${o} ${R + Y_OFFSET - TOP_ARC_SHIFT}`,
      `L ${o} ${R + Y_OFFSET}`,
    ]

    for (let t = 0; t < n - 1; t++) {
      const yCurr = Y[t + 1]
      const yNext = Y[t + 2]
      const yExit = yCurr + R - O_TOTAL + Y_OFFSET  // fixed exit y for arc-2 of this turn

      if (t % 2 === 0) {
        // Even turn: left vertical (x=o)  right vertical (x=Wr-oj)
        segs.push(`L ${o} ${yCurr - R + Y_OFFSET}`)
        segs.push(`A ${r}  ${r}  0 0 0 ${R}      ${yCurr - o + Y_OFFSET}`)   // DOWNRIGHT, center (R, yCurr-R)
        segs.push(`L ${Wr - R} ${yCurr - o + Y_OFFSET}`)
        segs.push(`A ${rj} ${rj} 0 0 1 ${Wr - oj} ${yExit}`)      // RIGHTDOWN, center (Wr-R, yExit)
        segs.push(`L ${Wr - oj} ${yNext - R + Y_OFFSET}`)
      } else {
        // Odd turn: right vertical (x=Wr-oj)  left vertical (x=o)
        segs.push(`L ${Wr - oj} ${yCurr - R + Y_OFFSET}`)
        segs.push(`A ${rj} ${rj} 0 0 1 ${Wr - R} ${yCurr - oj + Y_OFFSET}`)  // DOWNLEFT,  center (Wr-R, yCurr-R)
        segs.push(`L ${R} ${yCurr - oj + Y_OFFSET}`)
        segs.push(`A ${r}  ${r}  0 0 0 ${o}      ${yExit}`)        // LEFTDOWN,  center (R, yExit)
        segs.push(`L ${o} ${yNext - R + Y_OFFSET}`)
      }
    }

    const lastY = Y[n] + Y_OFFSET
    if ((n - 2) % 2 === 0) {
      segs.push(`L ${Wr - oj} ${lastY}`)  // ended on right vertical
    } else {
      segs.push(`L ${o} ${lastY}`)         // ended on left vertical
    }
    parts.push({ d: segs.join(' '), color: COLORS[i] })
  }
  return parts
}

function SerpentineBorder({
  children,
  N = 5,
  STROKE_WIDTH = 8,
  R = 50,
  BORDER_EXTRA = 70,
  COLORS = ['#561d25', '#ce8147', '#ecdd7b', '#68b0ab', '#696d7d'],
}) {
  const O_TOTAL = (N - 1) * STROKE_WIDTH
  const TOP_OFFSET = 2 * STROKE_WIDTH
  const Y_OFFSET = O_TOTAL / 2
  const TOP_ARC_SHIFT = ((N - 1) / 2) * STROKE_WIDTH + Y_OFFSET
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
      const borderWidth = W + BORDER_EXTRA
      setDimensions({ width: borderWidth, height: totalHeight })
      setPaths(buildPathD(borderWidth, Y, N, R, STROKE_WIDTH, COLORS, TOP_ARC_SHIFT, Y_OFFSET, O_TOTAL))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(wrapper)
    return () => ro.disconnect()
  }, [children, N, STROKE_WIDTH, R, BORDER_EXTRA, COLORS])

  return (
    <div ref={wrapperRef} className="serpentine-wrapper">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <svg
          className="serpentine-border-svg"
          style={{
            width: `calc(100% + ${BORDER_EXTRA}px)`,
            left: -BORDER_EXTRA / 2,
            top: -(TOP_OFFSET + TOP_ARC_SHIFT),
            height: `calc(100% + ${TOP_OFFSET + TOP_ARC_SHIFT}px)`,
          }}
          viewBox={`${-STROKE_WIDTH * 2 - STROKE_WIDTH / 2} ${-STROKE_WIDTH * 2 - TOP_ARC_SHIFT} ${dimensions.width + STROKE_WIDTH * 4 + STROKE_WIDTH / 2 + STROKE_WIDTH} ${dimensions.height + TOP_OFFSET + TOP_ARC_SHIFT}`}
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
