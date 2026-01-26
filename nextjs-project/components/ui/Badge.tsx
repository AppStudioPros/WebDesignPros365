import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-white/10 border border-white/20 text-white',
        accent: 'bg-accent/20 border border-accent/30 text-accent',
        primary: 'bg-primary/20 border border-primary/30 text-primary-light',
        success: 'bg-success/20 border border-success/30 text-success',
        warning: 'bg-warning/20 border border-warning/30 text-warning',
        error: 'bg-error/20 border border-error/30 text-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'accent' && 'bg-accent',
            variant === 'primary' && 'bg-primary-light',
            variant === 'success' && 'bg-success',
            variant === 'warning' && 'bg-warning',
            variant === 'error' && 'bg-error',
            !variant && 'bg-white/60'
          )}
        />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
