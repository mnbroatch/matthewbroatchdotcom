import { SerpentineBorderProvider } from './context/SerpentineBorderContext'
import SerpentineBorderWithDemo from './components/SerpentineBorderWithDemo'
import DialogueSection from './components/DialogueSection'
import BorderDemoSection from './components/BorderDemoSection'
import ExperienceSection from './components/ExperienceSection'
import BoardGameSection from './components/BoardGameSection'
import ReplyGuyBotSection from './components/ReplyGuyBotSection'
import MusicSection from './components/MusicSection'

function App() {
  return (
    <SerpentineBorderProvider>
      <div className="main-content">
        <SerpentineBorderWithDemo>
          <DialogueSection />
          <BorderDemoSection />
          <BoardGameSection />
          <ReplyGuyBotSection />
          <MusicSection />
          <MusicSection />
          <MusicSection />
          <MusicSection />
          <MusicSection />
          <MusicSection />
          <MusicSection />
          <MusicSection />
          <MusicSection />
          <MusicSection />
          <ExperienceSection />
        </SerpentineBorderWithDemo>
      </div>
    </SerpentineBorderProvider>
  )
}

export default App
