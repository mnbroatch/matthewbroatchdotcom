import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react';
import { Game, useGameserverConnection } from "board-game-engine-react";

import ticTacToeRules from "../tic-tac-toe.json";

function BoardGameModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isOver, setIsOver] = useState(false)

  const gameConnection = useGameserverConnection({
    gameRules: JSON.stringify(ticTacToeRules),
    numPlayers: 2,
    debug: false,
    singlePlayer: true,
  })

  useEffect(() => {
    if (gameConnection.gameover) {
      setIsOver(true)
    }
  }, [gameConnection.gameover])

  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Enter' && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Board game editor"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="modal-placeholder">
          {!isPlaying && <>
            <h2>This Code:</h2>
            <Editor
              height="400px"
              className="editor__input"
              defaultLanguage="json"
              value={JSON.stringify(ticTacToeRules, null, 2)}
              theme="vs-dark"
              loading={null} 
              onDialogueEnd={() => {}}
              options={{
                minimap: { enabled: false },
                fontSize: 8,
                readOnly: true
              }}
            />
            <h2>
              Becomes...
              <button
                type="button"
                className="board-game-modal-cta"
                onClick={() => { setIsPlaying(true) }}
              >
                Continue to Play
              </button>
            </h2>
          </>}
          {isPlaying && <>
            <h2>A Playable Prototype</h2>
            <Game gameConnection={gameConnection} />
          </>}
          {isOver && (
            <div className="board-game-end-screen" aria-live="polite">
              <h2 className="board-game-end-screen__title">Game over</h2>
              <p className="board-game-end-screen__blurb">
                This demo was built with the same engine you can use at boardgameengine.com — define rules in a special JSON format, get a playable game and online multiplayer in the browser.
              </p>
              <p className="board-game-end-screen__cta-text">
                Edit this game and play more online:
              </p>
              <a
                href="https://boardgameengine.com"
                target="_blank"
                rel="noopener noreferrer"
                className="board-game-end-screen__link"
              >
                boardgameengine.com
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BoardGameModal
