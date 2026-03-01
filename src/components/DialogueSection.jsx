import { useState } from 'react'
import DialogueTree from 'react-dialogue-tree'
import Section from './Section'
import OneMessageNode from './OneMessageNode'
import { landingDialogue } from '../dialogue/landing'
import 'react-dialogue-tree/dist/react-dialogue-tree.css'

const YARNBOUND_GITHUB = 'https://github.com/mnbroatch/bondage'
const REACT_DIALOGUE_TREE_GITHUB = 'https://github.com/mnbroatch/react-dialogue-tree'

function DialogueSection() {
  const [dialogueEnded, setDialogueEnded] = useState(false)

  return (
    <Section
      className="section-dialogue"
      aria-label="Welcome dialogue"
      animateOnScroll={false}
      backgroundColor="var(--sand)"
    >
      {!dialogueEnded ? (
        <div className="dialogue-tree-wrapper one-message-dialogue">
          <DialogueTree
            dialogue={landingDialogue}
            startAt="Start"
            defaultOption="Continue"
            finalOption="Begin"
            onDialogueEnd={() => setDialogueEnded(true)}
            combineTextAndOptionsResults={false}
            customNode={OneMessageNode}
          />
        </div>
      ) : (
        <div className="dialogue-section-end">
          <div className="section-technical">
            <p className="section-blurb-technical">
              Yarn Language dialogue, powered by Bondage.js and react-dialogue-tree.
            </p>
            <p className="section-technical-links">
              <a href={YARNBOUND_GITHUB} target="_blank" rel="noopener noreferrer">Bondage.js (YarnBound)</a>
              {' · '}
              <a href={REACT_DIALOGUE_TREE_GITHUB} target="_blank" rel="noopener noreferrer">react-dialogue-tree</a>
            </p>
          </div>
        </div>
      )}
    </Section>
  )
}

export default DialogueSection
