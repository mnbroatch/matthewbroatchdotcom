/**
 * Custom node for react-dialogue-tree: one message at a time.
 * Hides history (returns null for isHistory) so only the current line is shown;
 * text-only lines show text + advance button; option lines show choices.
 * Matches the pattern from react-dialogue-tree stories/write-in-the-words.
 */
function OneMessageNode({
  node: { text, options: allOptions, selected, isDialogueEnd },
  defaultOption,
  finalOption,
  isHistory,
  advance,
}) {
  if (isHistory) return null

  let options
  if (!allOptions) {
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

  return (
    <div className="dialogue-node one-message-node">
      {text && <div className="dialogue-node__text">{text}</div>}
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
