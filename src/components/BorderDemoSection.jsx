import { useContext, useState } from 'react'
import Section from './Section'
import { SerpentineBorderContext } from '../context/SerpentineBorderContext'
import { resolveOverlapToPixels } from './SerpentineBorder'

function NumericInput({ value, onChange, ...props }) {
  const [pending, setPending] = useState(null)
  const displayValue = pending !== null ? pending : String(value)
  const handleChange = (e) => {
    const raw = e.target.value
    const n = Number(raw)
    if (raw !== '' && !Number.isNaN(n)) {
      onChange(n)
      setPending(null)
    } else {
      setPending(raw)
    }
  }
  const handleBlur = () => {
    setPending(null)
  }
  return (
    <input
      type="number"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
    />
  )
}

function BorderDemoSection() {
  const ctx = useContext(SerpentineBorderContext)
  if (!ctx) {
    return (
      <Section className="section-border-demo" backgroundColor="var(--charcoal-blue)">
        <h2 className="section-title">Serpentine border</h2>
        <p className="section-blurb">Border controls require SerpentineBorderProvider.</p>
      </Section>
    )
  }

  const {
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
    setColorAt,
    addColor,
    removeColor,
  } = ctx

  return (
    <Section className="section-border-demo" backgroundColor="var(--charcoal-blue)">
      <h2 className="section-title">Serpentine border</h2>
      <p className="section-blurb">
        This border is drawn with a single SVG that weaves between sections. Adjust the parameters below to change it in real time.
      </p>
      <div className="border-demo-controls">
        <label className="border-demo-label">
          <span>Stroke count</span>
          <NumericInput value={strokeCount} onChange={setStrokeCount} />
        </label>
        <label className="border-demo-label">
          <span>Stroke width (px)</span>
          <NumericInput value={strokeWidth} onChange={setStrokeWidth} />
        </label>
        <label className="border-demo-label">
          <span>Radius (px)</span>
          <NumericInput value={radius} onChange={setRadius} />
        </label>
        <div className="border-demo-label">
          <span>Horizontal overlap</span>
          <div className="border-demo-overlap-radios">
            <label className="border-demo-radio">
              <input
                type="radio"
                name="overlapMode"
                checked={horizontalOverlap === 'borderWidth'}
                onChange={() => setHorizontalOverlap('borderWidth')}
              />
              Border width
            </label>
            <label className="border-demo-radio">
              <input
                type="radio"
                name="overlapMode"
                checked={horizontalOverlap === 'halfBorderWidth'}
                onChange={() => setHorizontalOverlap('halfBorderWidth')}
              />
              Half border width
            </label>
            <div className="border-demo-overlap-px">
              <label className="border-demo-radio">
                <input
                  type="radio"
                  name="overlapMode"
                  checked={typeof horizontalOverlap === 'number'}
                  onChange={() =>
                    setHorizontalOverlap(resolveOverlapToPixels(horizontalOverlap, strokeCount, strokeWidth))
                  }
                />
                Pixels
              </label>
              <NumericInput
                value={
                  typeof horizontalOverlap === 'number'
                    ? horizontalOverlap
                    : resolveOverlapToPixels(horizontalOverlap, strokeCount, strokeWidth)
                }
                onChange={setHorizontalOverlap}
                disabled={typeof horizontalOverlap !== 'number'}
              />
              <span className="border-demo-overlap-px-suffix">px per side</span>
            </div>
          </div>
        </div>
        <div className="border-demo-label">
          <span>Layout mode</span>
          <div className="border-demo-overlap-radios">
            <label className="border-demo-radio">
              <input
                type="radio"
                name="layoutMode"
                checked={layoutMode === 'content'}
                onChange={() => setLayoutMode('content')}
              />
              Content defines space
            </label>
            <label className="border-demo-radio">
              <input
                type="radio"
                name="layoutMode"
                checked={layoutMode === 'border'}
                onChange={() => setLayoutMode('border')}
              />
              Border defines space
            </label>
          </div>
        </div>
      </div>
      <div className="border-demo-colors">
        <span className="border-demo-colors-label">Colors</span>
        <div className="border-demo-colors-list">
          {colors.map((color, i) => (
            <label key={i} className="border-demo-color-swatch">
              <input
                type="color"
                value={color}
                onChange={(e) => setColorAt(i, e.target.value)}
                title={`Color ${i + 1}`}
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColorAt(i, e.target.value)}
                className="border-demo-color-hex"
                spellCheck={false}
              />
            </label>
          ))}
        </div>
        <div className="border-demo-colors-actions">
          <button type="button" onClick={addColor} className="border-demo-btn">Add color</button>
          <button type="button" onClick={removeColor} className="border-demo-btn" disabled={colors.length <= 1}>
            Remove color
          </button>
        </div>
      </div>
    </Section>
  )
}

export default BorderDemoSection
