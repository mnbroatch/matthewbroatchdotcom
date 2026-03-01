import SerpentineBorder from './components/SerpentineBorder'
import DialogueSection from './components/DialogueSection'
import ExperienceSection from './components/ExperienceSection'
import BoardGameSection from './components/BoardGameSection'
import ReplyGuyBotSection from './components/ReplyGuyBotSection'
import MusicSection from './components/MusicSection'

function App() {
  return (
    <SerpentineBorder>
      <main>
        <DialogueSection />
        <BoardGameSection />
        <ReplyGuyBotSection />
        <MusicSection />
        <ExperienceSection />
      </main>
    </SerpentineBorder>
  )
}

export default App
