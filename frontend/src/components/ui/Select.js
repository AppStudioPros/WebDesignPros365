import React from 'react';
import { cn } from '../../lib/utils';

const Select = React.forwardRef(({ className, error, options = [], ...props }, ref) => {
  return (
    <div className="w-full">
      <select
        className={cn(
          'flex h-11 w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white',
          'focus:outline-none focus:ring-2 focus:ring-[#00d9ff]/50 focus:border-[#00d9ff]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-all duration-200 appearance-none cursor-pointer',
          error ? 'border-[#ff3366]' : 'border-white/10',
          className
        )}
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#0f1419] text-white">
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-[#ff3366]">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';

export { Select };
