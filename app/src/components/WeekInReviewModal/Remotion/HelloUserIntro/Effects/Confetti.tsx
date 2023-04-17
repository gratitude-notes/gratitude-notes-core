import { AbsoluteFill } from 'remotion'
import Confetti, { ConfettiConfig } from 'remotion-confetti'
export const ConfettiExample = () => {
  const confettiConfig1: ConfettiConfig = {
    particleCount: 200,
    startVelocity: 30,
    spread: 360,
    x: 500,
    y: 600,
    scalar: 1,
  }

  return (
    <div className="flex flex-col gap-4 justify-center mx-auto text-center">
      <AbsoluteFill style={{ backgroundColor: 'white' }}>
        <Confetti {...confettiConfig1} />
      </AbsoluteFill>
    </div>
  )
}