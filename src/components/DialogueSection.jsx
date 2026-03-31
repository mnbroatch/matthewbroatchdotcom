import { useState, useCallback, useMemo } from 'react'
import DialogueTree from 'react-dialogue-tree'
import Section from './Section'
import OneMessageNode from './OneMessageNode'
import NpmPackageLink from './NpmPackageLink'
import { landingDialogue } from '../dialogue/landing'
import 'react-dialogue-tree/dist/react-dialogue-tree.css'

const YARNBOUND_GITHUB = 'https://github.com/mnbroatch/bondage'
const REACT_DIALOGUE_TREE_GITHUB = 'https://github.com/mnbroatch/react-dialogue-tree'
const NPM_REACT_DIALOGUE_TREE = 'https://www.npmjs.com/package/react-dialogue-tree'

/** Shown below the last dialogue line (no advance button). */
function LandingDialogueTechSpecs() {
  return (
    <div className="section-technical one-message-node__tech-specs">
      <p className="section-blurb-technical">
        Yarn Language JavaScript Interpreter. Uses Jison parser generator.
      </p>
      <p className="section-technical-links">
        <a href={YARNBOUND_GITHUB} target="_blank" rel="noopener noreferrer">Bondage.js (YarnBound)</a>
        {' · '}
        <a href={REACT_DIALOGUE_TREE_GITHUB} target="_blank" rel="noopener noreferrer">react-dialogue-tree</a>
      </p>
    </div>
  )
}

function makeOneMessageNode(displayVariant, yarnSnippet) {
  function BoundOneMessageNode(props) {
    return (
      <OneMessageNode
        {...props}
        displayVariant={displayVariant}
        yarnSnippet={yarnSnippet}
        TechSpecsFooter={LandingDialogueTechSpecs}
      />
    )
  }
  return BoundOneMessageNode
}

function DialogueSection(props) {
  const [useCustomNode, setUseCustomNode] = useState(true)
  const [displayVariant, setDisplayVariant] = useState('custom')

  const handleCommand = useCallback((result) => {
    const cmd = result.command
    if (cmd === 'useDefaultNode') setUseCustomNode(false)
    if (cmd === 'useCustomNode') {
      setUseCustomNode(true)
      setDisplayVariant('custom')
    }
    if (cmd === 'useYarnCodeNode') setDisplayVariant('yarnCode')
    if (cmd === 'useWavyNode') setDisplayVariant('wavy')
  }, [])

  const CustomNode = useMemo(
    () => makeOneMessageNode(displayVariant, landingDialogue),
    [displayVariant]
  )

  return (
    <Section
      {...props}
      className="section-dialogue"
      aria-label="Welcome dialogue"
      animateOnScroll={false}
      backgroundColor="var(--sand)"
    >
      <NpmPackageLink href={NPM_REACT_DIALOGUE_TREE} aria-label="react-dialogue-tree on npm" />
      <div
        className={`dialogue-tree-wrapper one-message-dialogue${!useCustomNode ? ' default-node-visible' : ''}`}
      >
        <DialogueTree
          dialogue={landingDialogue}
          startAt="Start"
          defaultOption="Continue"
          finalOption="Begin"
          combineTextAndOptionsResults
          handleCommand={handleCommand}
          customNode={useCustomNode ? CustomNode : undefined}
        />
      </div>
    </Section>
  )
}

export default DialogueSection
