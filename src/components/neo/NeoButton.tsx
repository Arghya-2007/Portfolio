import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const NeoButton = forwardRef<HTMLButtonElement, NeoButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "neo px-6 py-3 bg-elevated text-primary font-heading font-medium hover:text-primary-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

NeoButton.displayName = 'NeoButton'
