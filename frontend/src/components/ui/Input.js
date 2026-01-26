import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-[#8734E1]/50 focus:border-[#8734E1]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-all duration-200',
          error ? 'border-red-500' : 'border-gray-300',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
