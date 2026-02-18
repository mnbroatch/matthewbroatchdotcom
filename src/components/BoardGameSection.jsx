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
      backgroundColor="rgba(255, 107, 53, 0.95)"
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
      </Section>
      <BoardGameModal
        isOpen={isBoardGameOpen}
        onClose={() => setIsBoardGameOpen(false)}
      />
    </>
  )
}

export default BoardGameSection
