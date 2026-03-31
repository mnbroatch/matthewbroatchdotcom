import { useEffect, useRef } from 'react'

function WavyText({ text, className }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll('[data-wavy]')
    if (!els?.length) return undefined
    let frame = 0
    const step = (t) => {
      const phase = t * 0.0025
      els.forEach((el, i) => {
        const y = Math.sin(phase + i * 0.42) * 7
        el.style.transform = `translateY(${y}px)`
      })
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [text])

  return (
    <span ref={rootRef} className={className}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          data-wavy
          className="one-message-node__wavy-char"
          style={{ display: 'inline-block' }}
        >
          {ch === ' ' ? '\u00a0' : ch}
        </span>
      ))}
    </span>
  )
}

/**
 * Custom node for react-dialogue-tree: one message at a time.
 * Hides history (returns null for isHistory) so only the current line is shown;
 * text-only lines show text + advance button; option lines show choices.
 * `displayVariant` is driven by Yarn commands (see DialogueSection handleCommand).
 */
function OneMessageNode({
  node: { text, options: allOptions, selected, isDialogueEnd },
  defaultOption,
  finalOption,
  isHistory,
  advance,
  displayVariant = 'custom',
  yarnSnippet = '',
  TechSpecsFooter,
}) {
  if (isHistory) return null

  const hideFinalAdvance =
    isDialogueEnd && TechSpecsFooter && !allOptions

  let options
  if (!allOptions) {
    if (hideFinalAdvance) {
      options = []
    } else {
      options = [
        {
          text: isDialogueEnd ? finalOption : defaultOption,
          className: [
            'dialogue-node__option',
            isDialogueEnd && 'dialogue-node__option--final',
            !isDialogueEnd && 'dialogue-node__option--default',
          ]
            .filter(Boolean)
            .join(' '),
          onClick: () => advance(),
        },
      ]
    }
  } else {
    options = allOptions.map(({ text: optionText, isAvailable }, index) => ({
      text: optionText,
      className: [
        'dialogue-node__option',
        !isAvailable && 'dialogue-node__option--disabled',
      ]
        .filter(Boolean)
        .join(' '),
      onClick: isAvailable ? () => advance(index) : undefined,
    }))
  }

  const rootClass = [
    'dialogue-node',
    'one-message-node',
    displayVariant === 'yarnCode' && 'one-message-node--yarn',
    displayVariant === 'wavy' && 'one-message-node--wavy',
  ]
    .filter(Boolean)
    .join(' ')

  const renderText = () => {
    if (!text) return null
    if (displayVariant === 'wavy') {
      return (
        <div className="dialogue-node__text">
          <WavyText text={text} />
        </div>
      )
    }
    return <div className="dialogue-node__text">{text}</div>
  }

  return (
    <div className={rootClass}>
      {renderText()}
      {displayVariant === 'yarnCode' && yarnSnippet && (
        <pre className="one-message-node__yarn">
          <code>{yarnSnippet}</code>
        </pre>
      )}
      {hideFinalAdvance && TechSpecsFooter && <TechSpecsFooter />}
      {options && options.length > 0 && (
        <ul className="dialogue-node__options">
          {options.map(({ text: optionText, className, onClick }, index) => (
            <li
              key={index}
              className={className}
              onClick={onClick}
              onKeyDown={(e) => {
                if (onClick && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  onClick()
                }
              }}
              role={onClick ? 'button' : undefined}
              tabIndex={onClick ? 0 : undefined}
            >
              {optionText}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default OneMessageNode
