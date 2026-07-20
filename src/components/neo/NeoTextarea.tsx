import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface NeoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const NeoTextarea = forwardRef<HTMLTextAreaElement, NeoTextareaProps>(
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
        <textarea
          ref={ref}
          id={id}
          rows={5}
          className={cn(
            'neo w-full bg-elevated px-4 py-3 font-body text-base outline-none transition-colors resize-none',
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

NeoTextarea.displayName = 'NeoTextarea'
