import { Sparkles } from '@react-three/drei'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useStore } from '../../store'

export function ParticleField() {
  const reducedMotion = useReducedMotion()
  const deviceTier = useStore(state => state.deviceTier)

  // Don't render on low or medium capability tiers to save performance
  if (deviceTier !== 'high') return null

  return (
    <Sparkles
      count={150}
      scale={20}
      size={2}
      speed={reducedMotion ? 0 : 0.2}
      opacity={0.15}
      color="#8FBFA3"
      noise={reducedMotion ? 0 : 1}
    />
  )
}
