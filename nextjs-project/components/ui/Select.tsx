import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
  options: { value: string; label: string }[]
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          className={cn(
            'flex h-11 w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white',
            'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-200 appearance-none cursor-pointer',
            error ? 'border-error' : 'border-white/10',
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-dark text-white">
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
