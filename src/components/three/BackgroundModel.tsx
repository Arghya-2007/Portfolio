import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations, Float } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
const keyboardGlbUrl = '/model/keyboard-draco.glb'
import { useStore } from '../../store'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { MODEL_POSES } from '../../content/modelPoses'

// Maximum mouse-tilt in radians (~3 degrees) — subtle parallax, not a spin
const TILT_MAX_RAD = 0.052
// Lerp/slerp damping factor — lower = smoother/laggier
const DAMPING = 0.05

export function BackgroundModel(props: any) {
  const group = useRef<THREE.Group>(null)
  const centerGroup = useRef<THREE.Group>(null)

  // ---- Model loading ----
  const { scene, animations } = useGLTF(keyboardGlbUrl)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions, mixer } = useAnimations(animations, group)
  const { size } = useThree()
  // Use fixed breakpoints for scale so it stays perfectly consistent across standard desktop sizes.
  // Mobile (<768px): 0.6 | Tablet (<1024px): 0.85 | Desktop (1024px+): 1.0
  const responsiveScale = size.width < 768 ? 0.6 : size.width < 1024 ? 0.85 : 1

  const reducedMotion = useReducedMotion()

  // ---- Mouse tracking (no React re-renders) ----
  const mouse = useRef({ x: 0, y: 0 })
  const isTouch = useRef(false)

  // ---- Interpolation targets (reused each frame, no allocation) ----
  const lerpedPos = useMemo(() => new THREE.Vector3(3, 0, -2), [])
  const targetQuat = useMemo(() => new THREE.Quaternion(), [])
  const targetEuler = useMemo(() => new THREE.Euler(), [])
  const lerpedScale = useRef(1)
  const lerpedOpacity = useRef(0.85)
  const idleIntensity = useRef(0)

  // Flat list of all cloned materials for per-frame opacity updates (Change 3)
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([])

  // ---- Event listeners (mouse + touch detection) ----
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    isTouch.current = mediaQuery.matches
    const handleTouchChange = (e: MediaQueryListEvent) => {
      isTouch.current = e.matches
    }
    mediaQuery.addEventListener('change', handleTouchChange)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      mediaQuery.removeEventListener('change', handleTouchChange)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // ---- Prepare animations for scrubbing (Change 1) ----
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return

    // Play each action but immediately pause it — this registers it with
    // the mixer so we can set .time manually without it advancing on its own.
    Object.values(actions).forEach((action) => {
      if (!action) return
      action.play()
      // Default to paused, we will unpause in the Hero section
      action.paused = true
    })
  }, [actions])

  // ---- Material setup + collect material refs for per-frame opacity ----
  const activeSection = useStore((state) => state.activeSectionIndex)

  useEffect(() => {
    const bgBase = new THREE.Color('#100F0D')
    const primarySage = new THREE.Color('#8FBFA3')
    const secondaryClay = new THREE.Color('#E0937A')

    // Center the model geometry at origin
    const box = new THREE.Box3().setFromObject(clone)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    clone.position.set(-center.x, -center.y, -center.z)

    const maxDim = Math.max(size.x, size.y, size.z)
    const targetSize = 20
    if (centerGroup.current && maxDim > 0) {
      const newBaseScale = targetSize / maxDim
      centerGroup.current.scale.setScalar(newBaseScale)
      centerGroup.current.userData.baseScale = newBaseScale
    }

    // Collect materials for per-frame opacity control
    const mats: THREE.MeshStandardMaterial[] = []

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh || child instanceof THREE.SkinnedMesh) {
        if (child.material) {
          child.material = (child.material as THREE.Material).clone()
          const mat = child.material as THREE.MeshStandardMaterial
          const name = (mat.name || child.name || '').toLowerCase()

          // Baseline warm-dark styling (Design.md §2 tokens)
          mat.color.copy(bgBase)
          mat.transparent = true
          mat.opacity = 0.85
          mat.roughness = 0.6
          mat.metalness = 0.3
          mat.envMapIntensity = 0.8

          if (name.includes('led') || name.includes('glow')) {
            mat.color.copy(primarySage)
            mat.emissive.copy(primarySage)
            mat.emissiveIntensity = 0.8
            mat.opacity = 0.95
          } else if (name.includes('keys_top') || name.includes('switch')) {
            mat.color.lerp(primarySage, 0.2)
            mat.opacity = 0.9
          } else if (name.includes('bottom') || name.includes('base') || name.includes('plate')) {
            mat.color.lerp(secondaryClay, 0.15)
            mat.opacity = 0.85
          }

          mats.push(mat)
        }
      }
    })

    materialsRef.current = mats
  }, [clone])

  // Spin accumulator for continuous rotation in animated sections
  // Spin accumulator for continuous rotation in animated sections
  const spinY = useRef(0)
  const isFirstFrame = useRef(true)

  // ---- Per-frame: pose interpolation + animation scrub + mouse tilt ----
  useFrame((state, delta) => {
    if (!group.current) return

    // Read store values directly (no React subscription in the render loop)
    const { activeSectionIndex, sectionScrollProgress } = useStore.getState()

    const poseCount = MODEL_POSES.length
    const currentPose = MODEL_POSES[activeSectionIndex] ?? MODEL_POSES[0]
    const nextPose = MODEL_POSES[Math.min(activeSectionIndex + 1, poseCount - 1)]
    const t = sectionScrollProgress // 0–1 within current section

    // ---- Continuous Idle Animation (Only in sections 1 to 4) ----
    let idleRotX = 0
    let idleRotY = 0
    let idleRotZ = 0
    let idlePosY = 0
    if (!reducedMotion) {
      const isAnimatedSection = activeSectionIndex >= 1 && activeSectionIndex <= 4
      const targetIntensity = isAnimatedSection ? 1 : 0
      // Lerp intensity to avoid snapping when entering/leaving animated sections
      idleIntensity.current += (targetIntensity - idleIntensity.current) * 0.05

      const time = state.clock.elapsedTime

      // We consider it transitioning if t is comfortably between 0 and 1
      const isTransitioning = t > 0.01 && t < 0.99

      if (isAnimatedSection || idleIntensity.current > 0.001) {
        // Accumulate continuous spin ONLY when settled (not transitioning)
        if (!isTransitioning) {
          spinY.current += delta * 0.6 * idleIntensity.current
        }

        // More dynamic bobbing and tilting
        idleRotX = Math.sin(time * 1.5) * 0.15 * idleIntensity.current

        // Normalize spin to -PI to PI so unwinding is at most 180 degrees
        let currentSpin = spinY.current % (Math.PI * 2)
        if (currentSpin > Math.PI) currentSpin -= Math.PI * 2
        if (currentSpin < -Math.PI) currentSpin += Math.PI * 2

        // Multiply by intensity so it fades to 0 when leaving sections
        idleRotY = currentSpin * idleIntensity.current

        idleRotZ = Math.cos(time * 1.2) * 0.12 * idleIntensity.current
        idlePosY = Math.sin(time * 2.0) * 0.15 * idleIntensity.current
      } else {
        // Force exactly zero when completely settled in Hero or Contact
        spinY.current = 0
      }
    }

    // ---- Change 3: Interpolate between section poses ----
    // Apply responsiveScale to X/Y positions and scale to adapt to smaller screens (like mobile)
    const interpX = (currentPose.position[0] + (nextPose.position[0] - currentPose.position[0]) * t) * responsiveScale
    const interpY = (currentPose.position[1] + (nextPose.position[1] - currentPose.position[1]) * t + idlePosY) * responsiveScale
    const interpZ = currentPose.position[2] + (nextPose.position[2] - currentPose.position[2]) * t

    const interpRotX = currentPose.rotation[0] + (nextPose.rotation[0] - currentPose.rotation[0]) * t
    const interpRotY = currentPose.rotation[1] + (nextPose.rotation[1] - currentPose.rotation[1]) * t
    const interpRotZ = currentPose.rotation[2] + (nextPose.rotation[2] - currentPose.rotation[2]) * t

    const interpScale = (currentPose.scale + (nextPose.scale - currentPose.scale) * t) * responsiveScale
    const interpOpacity = currentPose.opacity + (nextPose.opacity - currentPose.opacity) * t

    // ---- Change 2: Subtle mouse tilt (additive, X/Y only, no Z) ----
    let tiltX = 0
    let tiltY = 0
    // Mouse tilt is active in Hero and all sections unless reducedMotion or touch
    if (!isTouch.current && !reducedMotion) {
      tiltX = mouse.current.y * TILT_MAX_RAD
      tiltY = mouse.current.x * TILT_MAX_RAD
    }

    // Combine base pose rotation + additive tilt + idle animation
    targetEuler.set(interpRotX + tiltX + idleRotX, interpRotY + tiltY + idleRotY, interpRotZ + idleRotZ)
    targetQuat.setFromEuler(targetEuler)

    // Damped application — smooth transitions, no snapping
    if (reducedMotion || isFirstFrame.current) {
      // Snap immediately to the static pose on first frame to prevent rotation-in
      group.current.position.set(interpX, interpY, interpZ)
      group.current.quaternion.copy(targetQuat)
      lerpedScale.current = interpScale
      lerpedOpacity.current = interpOpacity
      isFirstFrame.current = false
    } else {
      lerpedPos.set(interpX, interpY, interpZ)
      group.current.position.lerp(lerpedPos, DAMPING)
      group.current.quaternion.slerp(targetQuat, DAMPING)
      lerpedScale.current += (interpScale - lerpedScale.current) * DAMPING
      lerpedOpacity.current += (interpOpacity - lerpedOpacity.current) * DAMPING
    }

    // Apply interpolated scale to the center group (preserves the auto-fit scaling)
    if (centerGroup.current) {
      const baseScale = centerGroup.current.userData.baseScale ?? centerGroup.current.scale.x
      centerGroup.current.userData.baseScale = baseScale
      centerGroup.current.scale.setScalar(baseScale * lerpedScale.current)
    }

    // Apply interpolated opacity to all materials
    const mats = materialsRef.current
    for (let i = 0; i < mats.length; i++) {
      // Scale each material's original opacity by the pose's opacity factor
      // (materials with different base opacities retain their relative differences)
      mats[i].opacity = mats[i].userData.baseOpacity !== undefined
        ? mats[i].userData.baseOpacity * lerpedOpacity.current
        : lerpedOpacity.current
    }

    // ---- Change 1: Scroll-scrubbed animation (per-section) ----
    if (mixer && actions && Object.keys(actions).length > 0) {
      if (Number(activeSectionIndex) === 0) {
        // Hero section: Freeze the action at the first frame (time = 0)
        // This provides a calm, still presence and ensures a smooth handoff
        // into the About section where t (scroll progress) starts at 0.
        Object.values(actions).forEach((action) => {
          if (!action) return
          action.paused = true
          action.time = 0
        })
        mixer.update(0)
      } else {
        // Other sections: scrub based on scroll progress
        Object.values(actions).forEach((action) => {
          if (!action) return
          action.paused = true
          const clip = action.getClip()
          // Map this section's scroll progress to the full clip duration.
          action.time = t * clip.duration
        })
        // Apply the exact frame without advancing by delta time
        mixer.update(0)
      }
    }
  })

  // ---- Store base opacity on materials after setup so per-frame scaling works ----
  useEffect(() => {
    // Run after the material setup effect has completed
    const mats = materialsRef.current
    for (let i = 0; i < mats.length; i++) {
      mats[i].userData.baseOpacity = mats[i].opacity
    }
  }, [clone])

  return (
    <group ref={group} {...props} dispose={null}>
      <Float
        speed={reducedMotion || Number(activeSection) === 0 ? 0 : 1}
        rotationIntensity={0}
        floatIntensity={reducedMotion || Number(activeSection) === 0 ? 0 : 0.15}
      >
        <group ref={centerGroup}>
          <primitive object={clone} />
        </group>
      </Float>
    </group>
  )
}

// Preload the GLB to avoid suspense waterfall
useGLTF.preload(keyboardGlbUrl)
