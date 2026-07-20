import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("glass p-6", className)} {...props}>
        {children}
      </div>
    )
  }
)
GlassPanel.displayName = 'GlassPanel'
