import React, { useContext } from 'react'
import { SerpentineBorder, getSectionsPadding } from 'serpentine-border'
import { SerpentineBorderContext } from '../context/SerpentineBorderContext'

/**
 * Wires demo context into SerpentineBorder by passing context values as props.
 * Injects sectionPadding into each child so Section can apply it to section-inner (content clears border; section and section-bg unchanged).
 */
export default function SerpentineBorderWithDemo({ children, layoutMode: layoutModeOverride }) {
  const ctx = useContext(SerpentineBorderContext)

  const borderProps = ctx
    ? {
        strokeCount: ctx.strokeCount,
        strokeWidth: ctx.strokeWidth,
        radius: ctx.radius,
        horizontalOverflow: ctx.horizontalOverflow,
        colors: ctx.colors,
        layoutMode: layoutModeOverride ?? ctx.layoutMode,
      }
    : undefined

  const sectionCount = React.Children.count(children)
  const sectionsPadding =
    ctx && sectionCount > 0
      ? getSectionsPadding({
          sectionCount,
          strokeCount: ctx.strokeCount,
          strokeWidth: ctx.strokeWidth,
          horizontalOverflow: ctx.horizontalOverflow,
        })
      : null

  const childrenWithPadding =
    sectionsPadding &&
    React.Children.map(children, (child, i) => {
      const isLast = i === sectionCount - 1
      const sectionPadding = isLast
        ? sectionsPadding.last
        : i % 2 === 0
          ? sectionsPadding.even
          : sectionsPadding.odd
      return React.cloneElement(child, { key: child?.key ?? i, sectionPadding })
    })

  return (
    <SerpentineBorder {...borderProps}>
      {childrenWithPadding ?? children}
    </SerpentineBorder>
  )
}
