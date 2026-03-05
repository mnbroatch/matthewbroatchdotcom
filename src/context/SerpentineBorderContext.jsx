import { createContext, useCallback, useMemo, useState } from 'react'
import { DEFAULT_COLORS } from '../constants/serpentineBorder'

export const SerpentineBorderContext = createContext(null)

const defaultState = {
  strokeCount: 5,
  strokeWidth: 14,
  radius: 100,
  horizontalOverlap: 'halfBorderWidth',
  layoutMode: 'border',
  colors: [...DEFAULT_COLORS],
}

export function SerpentineBorderProvider({ children, initialValues }) {
  const [strokeCount, setStrokeCount] = useState(initialValues?.strokeCount ?? defaultState.strokeCount)
  const [strokeWidth, setStrokeWidth] = useState(initialValues?.strokeWidth ?? defaultState.strokeWidth)
  const [radius, setRadius] = useState(initialValues?.radius ?? defaultState.radius)
  const [horizontalOverlap, setHorizontalOverlap] = useState(initialValues?.horizontalOverlap ?? defaultState.horizontalOverlap)
  const [layoutMode, setLayoutMode] = useState(initialValues?.layoutMode ?? defaultState.layoutMode)
  const [colors, setColors] = useState(initialValues?.colors ?? defaultState.colors)

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
