import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { BackgroundModel } from './BackgroundModel'
import { ParticleField } from './ParticleField'
import { useStore } from '../../store'

export default function ThreeScene() {
  const deviceTier = useStore(state => state.deviceTier)

  // On low capability, don't mount the 3D canvas at all.
  // Instead, show a static fallback gradient mimicking the primary/secondary colors.
  if (deviceTier === 'low') {
    return (
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 70% 60%, rgba(143,191,163,0.15) 0%, transparent 50%), radial-gradient(ellipse at 30% 40%, rgba(224,147,122,0.1) 0%, transparent 50%)'
        }}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={deviceTier === 'high' ? [1, 2] : 1}
        performance={{ min: 0.5 }}
        eventSource={document.getElementById('root') || undefined}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#E0937A" />
          
          {/* Only use environment mapping on high tier */}
          {deviceTier === 'high' && <Environment preset="city" />}
          
          <BackgroundModel />
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  )
}
