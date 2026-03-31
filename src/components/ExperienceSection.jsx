import Section from './Section'
import { experience } from '../data/experience'

function ExperienceSection(props) {
  return (
    <Section
      {...props}
      className="section-experience"
      aria-label="Work experience"
      backgroundColor="var(--charcoal-blue)"
    >
      <h2 className="section-title">Work</h2>
      <ul className="experience-grid">
        {experience.map(({ id, title, description, link, logo }) => (
          <li key={id} className="experience-card">
            <a href={link} target="_blank" rel="noopener noreferrer" className="experience-card__link">
              <img src={logo} alt="" className="experience-card__logo" width="64" height="64" />
              <div className="experience-card__body">
                <h3 className="experience-card__title">{title}</h3>
                <p className="experience-card__description">{description}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <p className="section-experience__contact">
        Contact:{' '}
        <a href="mailto:mnbroatch@gmail.com" className="section-experience__email">
          mnbroatch@gmail.com
        </a>
      </p>
    </Section>
  )
}

export default ExperienceSection
