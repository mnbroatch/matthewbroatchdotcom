import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { Game, useGameserverConnection } from 'board-game-engine-react'

import ticTacToeRules from '../tic-tac-toe.json'

function BoardGameDemoContent({ onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isOver, setIsOver] = useState(false)

  const gameConnection = useGameserverConnection({
    gameRules: ticTacToeRules,
    numPlayers: 2,
    debug: false,
    singlePlayer: true,
  })

  useEffect(() => {
    if (!gameConnection.gameover) return
    const t = setTimeout(() => setIsOver(true), 1000)
    return () => clearTimeout(t)
  }, [gameConnection.gameover])

  return (
    <div className="board-game-demo-content">
      {onClose && (
        <button
          type="button"
          className="board-game-demo-close"
          onClick={onClose}
          aria-label="Close demo"
        >
          ×
        </button>
      )}
      {!isPlaying && (
        <>
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
              readOnly: true,
            }}
          />
          <h2>
            Becomes…
            <button
              type="button"
              className="board-game-modal-cta"
              onClick={() => setIsPlaying(true)}
            >
              Continue to Play
            </button>
          </h2>
        </>
      )}
      {isPlaying && (
        <div className="board-game-demo-play-wrapper">
          <h2>A Playable Prototype</h2>
          <Game gameConnection={gameConnection} />
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
      )}
    </div>
  )
}

export default BoardGameDemoContent
