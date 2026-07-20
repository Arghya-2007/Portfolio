/**
 * Per-section 3D model poses for the background keyboard.
 *
 * Each pose defines the model's position, rotation, scale, and opacity
 * for one of the six page sections. The BackgroundModel component lerps
 * between consecutive poses as the user scrolls.
 *
 * Positions alternate left/right to avoid overlapping centered section text.
 * Opacity and scale are kept low so the model reads as ambient background
 * (Design.md §6 — non-competing with foreground content).
 */

export interface ModelPose {
  position: [number, number, number]
  rotation: [number, number, number] // Euler angles (radians)
  scale: number
  opacity: number
}

export const MODEL_POSES: ModelPose[] = [
  // 0 — Hero: right side, dynamic floating angle
  {
    position: [3.2, -1.8, -3.5], // Balanced depth and height on the right
    rotation: [0.45, -0.25, 0.05], // Tilted to show keys, angled slightly left toward content, tiny z-tilt for natural float
    scale: 0.5,
    opacity: 0.9,
  },
  // 1 — About: drift left, slight tilt
  {
    position: [-3, -2, -3],
    rotation: [0.1, 0.5, 0],
    scale: 0.5,
    opacity: 0.7,
  },
  // 2 — TechStack: back to right, different angle
  {
    position: [2.5, -1.5, -2.5],
    rotation: [-0.15, -0.8, 0],
    scale: 0.5,
    opacity: 0.75,
  },
  // 3 — Projects: left, recessed
  {
    position: [-2.5, -0.5, -3],
    rotation: [0.2, 1.0, 0],
    scale: 0.5,
    opacity: 0.65,
  },
  // 4 — Roadmap: right, pulled forward slightly
  {
    position: [3.5, -1, -2],
    rotation: [-0.1, -1.2, 0],
    scale: 0.5,
    opacity: 0.7,
  },
  // 5 — Contact: centered, recessed, minimal
  {
    position: [0, -2, -4],
    rotation: [0.3, 0, 0],
    scale: 0.7,
    opacity: 0.6,
  },
]
