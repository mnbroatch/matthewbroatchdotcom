import { useState } from 'react'
import Section from './Section'
import BoardGameModal from './BoardGameModal'

function BoardGameSection() {
  const [isBoardGameOpen, setIsBoardGameOpen] = useState(false)

  return (
    <>
      <Section
        className="section-board-game"
        aria-label="Board game engine"
        backgroundImage="/bg/boardgame.png"
        backgroundColor="var(--charcoal-blue)"
      >
        <h2 className="section-title">Board game engine</h2>
        <p className="board-game-blurb">
          A custom engine for building and testing board games. Rules, pieces, and boards — all in one place.
        </p>
        <button
          type="button"
          className="board-game-cta"
          onClick={() => setIsBoardGameOpen(true)}
        >
          Open editor
        </button>
        <div className="section-technical">
          <p className="section-blurb-technical">
            JSON rules engine, real-time multiplayer, board-game-engine-react.
          </p>
        </div>
      </Section>
      <BoardGameModal
        isOpen={isBoardGameOpen}
        onClose={() => setIsBoardGameOpen(false)}
      />
    </>
  )
}

export default BoardGameSection
