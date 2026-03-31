import { SerpentineBorderProvider } from './context/SerpentineBorderContext'
import SerpentineBorderWithDemo from './components/SerpentineBorderWithDemo'
import ResumeHeader from './components/ResumeHeader'
import DialogueSection from './components/DialogueSection'
import BorderDemoSection from './components/BorderDemoSection'
import ExperienceSection from './components/ExperienceSection'
import BoardGameSection from './components/BoardGameSection'
import ReplyGuyBotSection from './components/ReplyGuyBotSection'
import MusicSection from './components/MusicSection'

function App() {
  return (
    <SerpentineBorderProvider>
      <ResumeHeader />
      <div className="main-content">
        <SerpentineBorderWithDemo layoutMode="border">
          <DialogueSection />
          <BorderDemoSection />
          <BoardGameSection />
          <ReplyGuyBotSection />
          <MusicSection />
          <ExperienceSection />
        </SerpentineBorderWithDemo>
      </div>
    </SerpentineBorderProvider>
  )
}

export default App
