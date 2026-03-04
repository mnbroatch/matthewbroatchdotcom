import { useContext } from 'react'
import Section from './Section'
import { SerpentineBorderContext } from '../context/SerpentineBorderContext'

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
          <input
            type="number"
            min={1}
            max={20}
            value={strokeCount}
            onChange={(e) => setStrokeCount(Number(e.target.value) || 1)}
          />
        </label>
        <label className="border-demo-label">
          <span>Stroke width (px)</span>
          <input
            type="number"
            min={2}
            max={40}
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value) || 2)}
          />
        </label>
        <label className="border-demo-label">
          <span>Radius (px)</span>
          <input
            type="number"
            min={20}
            max={200}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value) || 20)}
          />
        </label>
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
