import Section from './Section'

function MoreSection() {
  return (
    <Section
      className="section-more"
      aria-label="More"
      backgroundImage="/bg/more.svg"
      backgroundColor="rgba(255, 0, 110, 0.94)"
    >
      <h2 className="section-title">More to come</h2>
      <p className="section-blurb">
        More projects and experiments will show up here as they’re ready.
      </p>
    </Section>
  )
}

export default MoreSection
