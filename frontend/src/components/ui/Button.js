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
    primary: 'bg-gradient-to-r from-[#1A3A6E] to-[#2F73EE] text-white shadow-lg hover:shadow-[#2F73EE]/30 hover:-translate-y-0.5 active:translate-y-0',
    accent: 'bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] text-white shadow-lg hover:shadow-[#8734E1]/30 hover:-translate-y-0.5 active:translate-y-0',
    gold: 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white shadow-lg hover:shadow-[#f59e0b]/30 hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border-2 border-[#8734E1]/30 text-[#8734E1] hover:bg-[#8734E1]/10 hover:border-[#8734E1]/50 active:bg-[#8734E1]/5',
    ghost: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
  };

  const sizes = {
    default: 'h-11 px-6 py-3',
    sm: 'h-9 px-4 py-2 text-sm',
    lg: 'h-14 px-8 py-4 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8734E1] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50',
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
