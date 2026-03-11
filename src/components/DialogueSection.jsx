import { useState, useCallback } from 'react'
import DialogueTree from 'react-dialogue-tree'
import Section from './Section'
import OneMessageNode from './OneMessageNode'
import NpmPackageLink from './NpmPackageLink'
import { landingDialogue } from '../dialogue/landing'
import 'react-dialogue-tree/dist/react-dialogue-tree.css'

const YARNBOUND_GITHUB = 'https://github.com/mnbroatch/bondage'
const REACT_DIALOGUE_TREE_GITHUB = 'https://github.com/mnbroatch/react-dialogue-tree'
const NPM_REACT_DIALOGUE_TREE = 'https://www.npmjs.com/package/react-dialogue-tree'

function DialogueSection(props) {
  const [dialogueEnded, setDialogueEnded] = useState(false)
  const [useCustomNode, setUseCustomNode] = useState(true)

  const handleCommand = useCallback((result) => {
    if (result.command === 'useDefaultNode') setUseCustomNode(false)
    if (result.command === 'useCustomNode') setUseCustomNode(true)
  }, [])

  return (
    <Section
      {...props}
      className="section-dialogue"
      aria-label="Welcome dialogue"
      animateOnScroll={false}
      backgroundColor="var(--sand)"
    >
      <NpmPackageLink href={NPM_REACT_DIALOGUE_TREE} aria-label="react-dialogue-tree on npm" />
      {!dialogueEnded ? (
        <div
          className={`dialogue-tree-wrapper one-message-dialogue${!useCustomNode ? ' default-node-visible' : ''}`}
        >
          <DialogueTree
            dialogue={landingDialogue}
            startAt="Start"
            defaultOption="Continue"
            finalOption="Begin"
            onDialogueEnd={() => setDialogueEnded(true)}
            combineTextAndOptionsResults={false}
            handleCommand={handleCommand}
            customNode={useCustomNode ? OneMessageNode : undefined}
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
