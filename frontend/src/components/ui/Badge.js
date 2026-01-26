import React from 'react';
import { cn } from '../../lib/utils';

const Badge = React.forwardRef(({ className, variant = 'default', dot, children, ...props }, ref) => {
  const variants = {
    default: 'bg-gray-100 border border-gray-200 text-gray-700',
    accent: 'bg-[#8734E1]/10 border border-[#8734E1]/30 text-[#8734E1]',
    primary: 'bg-[#2F73EE]/10 border border-[#2F73EE]/30 text-[#2F73EE]',
    success: 'bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981]',
  };

  const dotColors = {
    default: 'bg-gray-500',
    accent: 'bg-[#8734E1]',
    primary: 'bg-[#2F73EE]',
    success: 'bg-[#10b981]',
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
