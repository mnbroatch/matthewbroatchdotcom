import { useContext, useState } from 'react'
import Section from './Section'
import NpmPackageLink from './NpmPackageLink'
import { SerpentineBorderContext } from '../context/SerpentineBorderContext'

const NPM_SERPENTINE_BORDER = 'https://www.npmjs.com/package/serpentine-border'

function resolveOverflowToPixels(horizontalOverflow, strokeCount, strokeWidth) {
  if (typeof horizontalOverflow === 'number') return horizontalOverflow
  const totalBorderWidth = strokeCount * strokeWidth
  if (horizontalOverflow === 'borderWidth') return totalBorderWidth
  if (horizontalOverflow === 'halfBorderWidth') return totalBorderWidth / 2
  return 0
}

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

function BorderDemoSection(props) {
  const ctx = useContext(SerpentineBorderContext)
  if (!ctx) {
    return (
      <Section {...props} className="section-border-demo" backgroundColor="var(--charcoal-blue)">
        <NpmPackageLink href={NPM_SERPENTINE_BORDER} aria-label="serpentine-border on npm" />
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
    horizontalOverflow,
    setHorizontalOverflow,
    colors,
    setColorAt,
    addColor,
    removeColor,
  } = ctx

  return (
    <Section {...props} className="section-border-demo" backgroundColor="var(--charcoal-blue)">
      <NpmPackageLink href={NPM_SERPENTINE_BORDER} aria-label="serpentine-border on npm" />
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
          <span>Horizontal overflow</span>
          <div className="border-demo-overlap-radios">
            <label className="border-demo-radio">
              <input
                type="radio"
                name="overlapMode"
                checked={horizontalOverflow === 'borderWidth'}
                onChange={() => setHorizontalOverflow('borderWidth')}
              />
              Border width
            </label>
            <label className="border-demo-radio">
              <input
                type="radio"
                name="overlapMode"
                checked={horizontalOverflow === 'halfBorderWidth'}
                onChange={() => setHorizontalOverflow('halfBorderWidth')}
              />
              Half border width
            </label>
            <div className="border-demo-overlap-px">
              <label className="border-demo-radio">
                <input
                  type="radio"
                  name="overlapMode"
                  checked={typeof horizontalOverflow === 'number'}
                  onChange={() =>
                    setHorizontalOverflow(resolveOverflowToPixels(horizontalOverflow, strokeCount, strokeWidth))
                  }
                />
                Pixels
              </label>
              <NumericInput
                value={
                  typeof horizontalOverflow === 'number'
                    ? horizontalOverflow
                    : resolveOverflowToPixels(horizontalOverflow, strokeCount, strokeWidth)
                }
                onChange={setHorizontalOverflow}
                disabled={typeof horizontalOverflow !== 'number'}
              />
              <span className="border-demo-overlap-px-suffix">px per side</span>
            </div>
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
