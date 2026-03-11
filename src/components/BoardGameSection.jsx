import { useState, useEffect, useRef } from 'react'
import Section from './Section'
import BoardGameDemoContent from './BoardGameDemoContent'
import NpmPackageLink from './NpmPackageLink'

const NPM_BOARD_GAME_ENGINE = 'https://www.npmjs.com/package/board-game-engine'

const BOARD_GAME_SECTION_ID = 'board-game'
const HEIGHT_TRANSITION_MS = 400

function BoardGameSection(props) {
  const [isDemoExpanded, setIsDemoExpanded] = useState(false)
  const [introHeight, setIntroHeight] = useState(null)
  const [demoHeight, setDemoHeight] = useState(null)
  const introRowRef = useRef(null)
  const demoRowRef = useRef(null)

  // Measure intro using inner content scrollHeight (reliable; not affected by row's current height).
  // On mount / when collapsed: measure once soon (double rAF) and again after transition when closing.
  useEffect(() => {
    if (isDemoExpanded) return
    const measure = () => {
      const inner = introRowRef.current?.querySelector('.board-game-section-row-inner')
      if (!inner) return
      const h = inner.scrollHeight
      if (h > 0) setIntroHeight(h)
    }
    let cancelled = false
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) measure()
      })
    })
    const t = setTimeout(() => {
      if (!cancelled) measure()
    }, HEIGHT_TRANSITION_MS + 50)
    return () => {
      cancelled = true
      cancelAnimationFrame(id)
      clearTimeout(t)
    }
  }, [isDemoExpanded])

  // Demo content is always mounted so Monaco can load in background; observe height from mount.
  useEffect(() => {
    const el = demoRowRef.current?.querySelector('.board-game-section-row-inner')
    if (!el) return
    const ro = new ResizeObserver(() => {
      const h = el.scrollHeight
      if (h > 0) setDemoHeight(h)
    })
    ro.observe(el)
    const h = el.scrollHeight
    if (h > 0) setDemoHeight(h)
    return () => ro.disconnect()
  }, [])

  function handleDemoClick() {
    const section = document.getElementById(BOARD_GAME_SECTION_ID)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsDemoExpanded(true)
  }

  function handleCloseDemo() {
    setIsDemoExpanded(false)
  }

  const containerHeight =
    isDemoExpanded
      ? (demoHeight ?? introHeight ?? undefined)
      : introHeight ?? undefined

  const showMeasuredHeight = containerHeight != null

  return (
    <Section
      {...props}
      id={BOARD_GAME_SECTION_ID}
      className="section-board-game"
      aria-label="Board game engine"
      backgroundImage="/bg/boardgame.png"
      backgroundColor="var(--charcoal-blue)"
    >
      <NpmPackageLink href={NPM_BOARD_GAME_ENGINE} aria-label="board-game-engine on npm" />
      <div
        className="board-game-section-swap"
        style={
          showMeasuredHeight
            ? {
                height: containerHeight,
                transition: `height ${HEIGHT_TRANSITION_MS}ms ease-out`,
                overflow: 'hidden',
              }
            : undefined
        }
      >
        <div
          ref={introRowRef}
          className="board-game-section-row board-game-section-row--intro"
          aria-hidden={isDemoExpanded && demoHeight != null}
          style={
            introHeight != null
              ? {
                  height: isDemoExpanded && demoHeight != null ? 0 : introHeight,
                  overflow: 'hidden',
                  transition: `height ${HEIGHT_TRANSITION_MS}ms ease-out`,
                }
              : undefined
          }
        >
          <div className="board-game-section-row-inner">
            <h2 className="section-title">Board game engine</h2>
            <p className="board-game-blurb">
              A custom engine for building and testing board games. Rules, pieces, and boards — all in one place.
            </p>
            <button
              type="button"
              className="board-game-cta"
              onClick={handleDemoClick}
            >
              Demo
            </button>
            <div className="section-technical">
              <p className="section-blurb-technical">
                JSON rules engine, real-time multiplayer, board-game-engine-react.
              </p>
            </div>
          </div>
        </div>
        <div
          ref={demoRowRef}
          className="board-game-section-row board-game-section-row--demo"
          aria-hidden={!isDemoExpanded}
          style={
            demoHeight != null
              ? {
                  height: isDemoExpanded ? demoHeight : 0,
                  overflow: 'hidden',
                  transition: `height ${HEIGHT_TRANSITION_MS}ms ease-out`,
                }
              : { overflow: 'hidden', height: 0 }
          }
        >
          <div className="board-game-section-row-inner">
            <BoardGameDemoContent onClose={handleCloseDemo} />
          </div>
        </div>
      </div>
    </Section>
  )
}

export default BoardGameSection
