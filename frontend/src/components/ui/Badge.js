import React from 'react';
import { cn } from '../../lib/utils';

const Badge = React.forwardRef(({ className, variant = 'default', dot, children, ...props }, ref) => {
  const variants = {
    default: 'bg-white/10 border border-white/20 text-white',
    accent: 'bg-[#00d9ff]/20 border border-[#00d9ff]/30 text-[#00d9ff]',
    primary: 'bg-[#0066cc]/20 border border-[#0066cc]/30 text-[#3388dd]',
    success: 'bg-[#00ff88]/20 border border-[#00ff88]/30 text-[#00ff88]',
  };

  const dotColors = {
    default: 'bg-white/60',
    accent: 'bg-[#00d9ff]',
    primary: 'bg-[#3388dd]',
    success: 'bg-[#00ff88]',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </div>
  );
});

Badge.displayName = 'Badge';

export { Badge };
