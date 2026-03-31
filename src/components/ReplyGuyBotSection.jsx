import Section from './Section'

const REDDIT_FAQ_URL = 'https://www.reddit.com/user/reply-guy-bot/comments/n9fpva/faq/'

function ReplyGuyBotSection(props) {
  const techBlurb =
    `Top 100 bot with 4000+ upvotes on botrank.net.\n\n` +
    `Efficient algorithm with smart caching of comments and users. Seeded by top posts but then detects most likely offenders and deep searches their comments until sufficient evidence is collected.\n\n` +
    `Along the way, detects more potential offenders, keeping the search focused and effective.`

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
        <p className="section-blurb-technical section-blurb-technical--preline">
          {techBlurb.split('botrank.net').map((chunk, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {chunk}
                <a href="https://botrank.net" target="_blank" rel="noopener noreferrer">botrank.net</a>
              </span>
            ) : (
              <span key={i}>{chunk}</span>
            )
          )}
        </p>
      </div>
    </Section>
  )
}

export default ReplyGuyBotSection
