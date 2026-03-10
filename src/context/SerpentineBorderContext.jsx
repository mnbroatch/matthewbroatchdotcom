import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

const SMALL_BREAKPOINT_PX = 1000
const smallMedia = typeof window !== 'undefined' && window.matchMedia(`(max-width: ${SMALL_BREAKPOINT_PX - 1}px)`)

export const SerpentineBorderContext = createContext(null)

const defaultState = {
  strokeCount: 5,
  strokeWidth: 14,
  radius: 100,
  horizontalOverlap: 'halfBorderWidth',
  layoutMode: 'content',
  colors: ['#561d25', '#ce8147', '#ecdd7b', '#68b0ab', '#696d7d'],
}

const smallScreenOverrides = {
  strokeWidth: 6,
  radius: 40,
  layoutMode: 'border',
}

function getInitialSmall() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(`(max-width: ${SMALL_BREAKPOINT_PX - 1}px)`).matches
}

export function SerpentineBorderProvider({ children, initialValues }) {
  const initialSmall = getInitialSmall()
  const [strokeCount, setStrokeCount] = useState(
    initialValues?.strokeCount ?? defaultState.strokeCount
  )
  const [strokeWidth, setStrokeWidth] = useState(
    initialValues?.strokeWidth ?? (initialSmall ? smallScreenOverrides.strokeWidth : defaultState.strokeWidth)
  )
  const [radius, setRadius] = useState(
    initialValues?.radius ?? (initialSmall ? smallScreenOverrides.radius : defaultState.radius)
  )
  const [horizontalOverlap, setHorizontalOverlap] = useState(
    initialValues?.horizontalOverlap ?? defaultState.horizontalOverlap
  )
  const [layoutMode, setLayoutMode] = useState(
    initialValues?.layoutMode ?? (initialSmall ? smallScreenOverrides.layoutMode : defaultState.layoutMode)
  )
  const [colors, setColors] = useState(initialValues?.colors ?? defaultState.colors)

  useEffect(() => {
    if (!smallMedia) return
    const applyBreakpoint = (e) => {
      if (e.matches) {
        setStrokeWidth(smallScreenOverrides.strokeWidth)
        setRadius(smallScreenOverrides.radius)
        setLayoutMode(smallScreenOverrides.layoutMode)
      } else {
        setStrokeWidth(defaultState.strokeWidth)
        setRadius(defaultState.radius)
        setLayoutMode(defaultState.layoutMode)
      }
    }
    smallMedia.addEventListener('change', applyBreakpoint)
    return () => smallMedia.removeEventListener('change', applyBreakpoint)
  }, [])

  const setColorAt = useCallback((index, value) => {
    setColors((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }, [])

  const addColor = useCallback(() => {
    setColors((prev) => [...prev, prev[prev.length - 1] ?? '#696969'])
  }, [])

  const removeColor = useCallback(() => {
    setColors((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))
  }, [])

  const value = useMemo(
    () => ({
      strokeCount,
      setStrokeCount,
      strokeWidth,
      setStrokeWidth,
      radius,
      setRadius,
      horizontalOverlap,
      setHorizontalOverlap,
      layoutMode,
      setLayoutMode,
      colors,
      setColors,
      setColorAt,
      addColor,
      removeColor,
    }),
    [strokeCount, strokeWidth, radius, horizontalOverlap, layoutMode, colors, setColorAt, addColor, removeColor]
  )

  return (
    <SerpentineBorderContext.Provider value={value}>
      {children}
    </SerpentineBorderContext.Provider>
  )
}
