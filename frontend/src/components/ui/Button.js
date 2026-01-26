import React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default', 
  children,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-gradient-to-r from-[#0066cc] to-[#0052a3] text-white shadow-lg hover:shadow-[#0066cc]/30 hover:-translate-y-0.5 active:translate-y-0',
    accent: 'bg-gradient-to-r from-[#00d9ff] to-[#00b8d9] text-[#0f1419] shadow-lg hover:shadow-[#00d9ff]/30 hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 active:bg-white/5',
    ghost: 'text-white/80 hover:text-white hover:bg-white/10',
  };

  const sizes = {
    default: 'h-11 px-6 py-3',
    sm: 'h-9 px-4 py-2 text-sm',
    lg: 'h-14 px-8 py-4 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d9ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1419] disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
