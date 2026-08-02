import { useMemo } from 'react'

interface Props {
  color: 'teal' | 'coral' | 'gold'
  size: number
  opacity?: number
  className?: string
}

export default function GlowOrb({ color, size, opacity = 0.15, className = '' }: Props) {
  const style = useMemo(() => {
    let rgb = '42, 157, 143' // teal
    if (color === 'coral') rgb = '231, 111, 81'
    if (color === 'gold') rgb = '233, 196, 106'

    return {
      width: `${size}px`,
      height: `${size}px`,
      background: `rgba(${rgb}, ${opacity})`,
      filter: 'blur(80px)',
      borderRadius: '9999px',
      position: 'absolute' as const,
      pointerEvents: 'none' as const,
    }
  }, [color, size, opacity])

  return <div style={style} className={className} />
}
