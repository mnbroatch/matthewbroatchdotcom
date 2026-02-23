import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react';
import * as B from "board-game-engine-react";
const Game = B.Game
const useGameserverConnection = B.useGameserverConnection
console.log('B', B)

console.log('useGameserverConnection', useGameserverConnection)

import ticTacToeRules from "../tic-tac-toe.json";

function BoardGameModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const gameConnection = useGameserverConnection({
    gameRules: ticTacToeRules,
    numPlayers: 2,
    singlePlayer: true
  })

  console.log('gameConnection', gameConnection)

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
              height="500px"
              className="editor__input"
              defaultLanguage="json"
              value={JSON.stringify(ticTacToeRules, null, 2)}
              theme="vs-dark"
              loading={null} 
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
        </div>
      </div>
    </div>
  )
}

export default BoardGameModal
