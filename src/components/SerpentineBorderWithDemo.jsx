import { useContext } from 'react'
import { SerpentineBorder } from 'serpentine-border'
import { SerpentineBorderContext } from '../context/SerpentineBorderContext'

/**
 * Wires demo context into SerpentineBorder by passing context values as props.
 * SerpentineBorder stays dumb (props only); this component is the only one that reads context for the border.
 * layoutMode prop overrides context (e.g. demo uses border-defined layout only).
 */
export default function SerpentineBorderWithDemo({ children, layoutMode: layoutModeOverride }) {
  const ctx = useContext(SerpentineBorderContext)

  const borderProps = ctx
    ? {
        strokeCount: ctx.strokeCount,
        strokeWidth: ctx.strokeWidth,
        radius: ctx.radius,
        horizontalOverlap: ctx.horizontalOverlap,
        colors: ctx.colors,
        layoutMode: layoutModeOverride ?? ctx.layoutMode,
      }
    : undefined

  return (
    <SerpentineBorder {...borderProps}>
      {children}
    </SerpentineBorder>
  )
}
