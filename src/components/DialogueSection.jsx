import DialogueTree from 'react-dialogue-tree'
import Section from './Section'
import OneMessageNode from './OneMessageNode'
import { landingDialogue } from '../dialogue/landing'
import 'react-dialogue-tree/dist/react-dialogue-tree.css'

function DialogueSection() {
  return (
    <Section
      className="section-dialogue"
      aria-label="Welcome dialogue"
      animateOnScroll={false}
    >
      <div className="dialogue-tree-wrapper one-message-dialogue">
        <DialogueTree
          dialogue={landingDialogue}
          startAt="Start"
          defaultOption="Continue"
          finalOption="Begin"
          onDialogueEnd={() => {}}
          combineTextAndOptionsResults={false}
          customNode={OneMessageNode}
        />
      </div>
    </Section>
  )
}

export default DialogueSection
