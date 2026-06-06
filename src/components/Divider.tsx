import type { ComponentPropsWithoutRef } from 'react';

type DividerProps = ComponentPropsWithoutRef<'hr'> & {
  soft?: boolean;
};

export function Divider({ className, soft = false, ...props }: DividerProps) {
  const color = soft ? 'border-slate-100' : 'border-slate-200';

  return (
    <hr
      role="presentation"
      {...props}
      className={`my-6 w-full border-0 border-t ${color} ${className ?? ''}`}
    />
  );
}
