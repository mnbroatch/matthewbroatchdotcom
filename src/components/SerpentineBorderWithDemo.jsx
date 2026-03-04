import { useContext } from 'react'
import SerpentineBorder from './SerpentineBorder'
import { SerpentineBorderContext } from '../context/SerpentineBorderContext'

/**
 * Wires demo context into SerpentineBorder by passing context values as props.
 * SerpentineBorder stays dumb (props only); this component is the only one that reads context for the border.
 */
export default function SerpentineBorderWithDemo({ children }) {
  const ctx = useContext(SerpentineBorderContext)

  const borderProps = ctx
    ? {
        N: ctx.strokeCount,
        STROKE_WIDTH: ctx.strokeWidth,
        R: ctx.radius,
        COLORS: ctx.colors,
      }
    : undefined

  return (
    <SerpentineBorder {...borderProps}>
      {children}
    </SerpentineBorder>
  )
}
