import { AbsoluteFill } from 'remotion'
import Confetti, { ConfettiConfig } from 'remotion-confetti'
import { HelloUserIntro } from './HelloUserIntro'
import { useSession } from '../../../lib/Session';
export const ConfettiExample = () => {
  const session = useSession();
  const confettiConfig1: ConfettiConfig = {
    particleCount: 200,
    startVelocity: 30,
    spread: 360,
    x: 500,
    y: 600,
    scalar: 1,
  }

  const confettiConfig2: ConfettiConfig = {
    particleCount: 200,
    startVelocity: 50,
    decay: 0.8,
    spread: 360,
    ticks: 100,
    gravity: 0.5,
    x: 960,
    y: 360,
    scalar: 1,
    colors: ['#000000', '#FFFFFF'],
  }

  return (
    <div className="flex flex-col gap-4 justify-center mx-auto text-center">
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      <Confetti {...confettiConfig1} />
      <HelloUserIntro displayName={session?.user?.displayName}/>
      {/* <Confetti {...confettiConfig2} /> */}
    </AbsoluteFill>
    </div>
  )
}