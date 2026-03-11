import Section from './Section'

const REDDIT_FAQ_URL = 'https://www.reddit.com/user/reply-guy-bot/comments/n9fpva/faq/'

function ReplyGuyBotSection(props) {
  return (
    <Section
      {...props}
      className="section-reply-guy-bot"
      aria-label="Reply-guy bot"
      backgroundImage="/bg/widgets.svg"
      backgroundColor="var(--cherry-rose)"
    >
      <h2 className="section-title">reddit reply-guy-bot</h2>
      <p className="section-blurb">
        Detects reddit comment plagiarism, reports it, and combats karma farming by bots.
      </p>
      <a
        href={REDDIT_FAQ_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="section-cta-link"
      >
        FAQ on Reddit
      </a>
      <div className="section-technical">
        <p className="section-blurb-technical">
          Top 100 bot with 4000+ upvotes on <a href="https://botrank.net" target="_blank" rel="noopener noreferrer">botrank.net</a>.
        </p>
      </div>
    </Section>
  )
}

export default ReplyGuyBotSection
