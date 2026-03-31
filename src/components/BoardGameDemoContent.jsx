import { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import { Game, useGameserverConnection } from 'board-game-engine-react'

import ticTacToeRules from '../tic-tac-toe.json'

function resetGameSession(conn) {
  if (!conn || typeof conn.reset !== 'function') return
  if (conn.client && typeof conn.client.reset === 'function') {
    conn.client.reset()
  }
  conn.reset()
}

function BoardGameDemoContent({ isDemoExpanded = false, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isOver, setIsOver] = useState(false)

  const gameConnection = useGameserverConnection({
    gameRules: ticTacToeRules,
    numPlayers: 2,
    debug: false,
    singlePlayer: true,
  })

  const gameConnectionRef = useRef(gameConnection)
  gameConnectionRef.current = gameConnection

  const wasDemoExpandedRef = useRef(false)
  useEffect(() => {
    if (!isDemoExpanded) {
      wasDemoExpandedRef.current = false
      return
    }
    if (wasDemoExpandedRef.current) return
    wasDemoExpandedRef.current = true

    setIsPlaying(false)
    setIsOver(false)

    let cancelled = false
    let frames = 0
    const maxFrames = 120

    const runReset = () => {
      if (cancelled) return
      const conn = gameConnectionRef.current
      const ready =
        conn &&
        typeof conn.reset === 'function' &&
        conn.client &&
        typeof conn.client.reset === 'function'
      if (ready) {
        resetGameSession(conn)
        return
      }
      frames += 1
      if (frames < maxFrames) {
        requestAnimationFrame(runReset)
      } else if (conn && typeof conn.reset === 'function') {
        resetGameSession(conn)
      }
    }
    requestAnimationFrame(runReset)
    return () => {
      cancelled = true
    }
  }, [isDemoExpanded])

  useEffect(() => {
    if (!gameConnection.gameover) return
    const t = setTimeout(() => setIsOver(true), 1000)
    return () => clearTimeout(t)
  }, [gameConnection.gameover])

  function handleClose() {
    onClose?.()
  }

  function handleBeginPlay() {
    resetGameSession(gameConnection)
    setIsOver(false)
    setIsPlaying(true)
  }

  return (
    <div className="board-game-demo-content">
      {onClose && (
        <button
          type="button"
          className="board-game-demo-close"
          onClick={handleClose}
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
          <h2 className="board-game-demo-becomes-heading">Becomes…</h2>
          <button
            type="button"
            className="board-game-modal-cta board-game-demo-play-cta"
            onClick={handleBeginPlay}
          >
            Continue to Play
          </button>
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
