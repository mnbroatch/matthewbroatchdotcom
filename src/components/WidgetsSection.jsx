import Section from './Section'

function WidgetsSection() {
  return (
    <Section
      className="section-widgets"
      aria-label="Widgets and demos"
      backgroundImage="/bg/widgets.svg"
      backgroundColor="var(--sand)"
    >
      <h2 className="section-title">Widgets & demos</h2>
      <p className="section-blurb">
        Live demos and links to things I’ve built. More widgets and embeds coming soon.
      </p>
      <div className="section-technical">
        <p className="section-blurb-technical">
          React components, Vite, static hosting on S3.
        </p>
      </div>
    </Section>
  )
}

export default WidgetsSection
