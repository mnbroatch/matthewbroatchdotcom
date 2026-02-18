import Section from './Section'
import { experience } from '../data/experience'

function ExperienceSection() {
  return (
    <Section
      className="section-experience"
      aria-label="Work experience"
    >
      <h2 className="section-title">Work</h2>
      <ul className="experience-grid">
        {experience.map(({ id, title, description, link, logo }) => (
          <li key={id} className="experience-card">
            <a href={link} target="_blank" rel="noopener noreferrer" className="experience-card__link">
              <img src={logo} alt="" className="experience-card__logo" width="64" height="64" />
              <h3 className="experience-card__title">{title}</h3>
              <p className="experience-card__description">{description}</p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default ExperienceSection
