import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const NeoInput = forwardRef<HTMLInputElement, NeoInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-sm font-mono"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(
            'neo w-full bg-elevated px-4 py-3 font-body text-base outline-none transition-colors',
            'placeholder:text-content-tertiary',
            'focus:ring-2 focus:ring-primary focus:ring-offset-0',
            error && 'ring-2 ring-secondary',
            className
          )}
          style={{ color: 'var(--text-primary)' }}
          {...props}
        />
        {error && (
          <p className="text-sm text-secondary font-mono">{error}</p>
        )}
      </div>
    )
  }
)

NeoInput.displayName = 'NeoInput'
