import Section from './Section'

function WidgetsSection() {
  return (
    <Section
      className="section-widgets"
      aria-label="Widgets and demos"
      backgroundImage="/bg/widgets.svg"
      backgroundColor="rgba(0, 212, 255, 0.94)"
    >
      <h2 className="section-title">Widgets & demos</h2>
      <p className="section-blurb">
        Live demos and links to things I’ve built. More widgets and embeds coming soon.
      </p>
    </Section>
  )
}

export default WidgetsSection
