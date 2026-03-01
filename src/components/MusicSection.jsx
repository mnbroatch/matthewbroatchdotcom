import Section from './Section'

const REVERBNATION_URL = 'https://www.reverbnation.com/yboy'

function MusicSection() {
  return (
    <Section
      className="section-music"
      aria-label="Music"
      backgroundImage="/bg/more.svg"
      backgroundColor="var(--golden-apricot)"
    >
      <h2 className="section-title">Music</h2>
      <p className="section-blurb">
        Music and tracks on ReverbNation.
      </p>
      <a
        href={REVERBNATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="section-cta-link"
      >
        reverbnation.com/yboy
      </a>
    </Section>
  )
}

export default MusicSection
