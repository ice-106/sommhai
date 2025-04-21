import { Slot } from '@radix-ui/react-slot';
import { cn } from '@sommhai/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const buttonVarients = cva(
  'relative inline-flex h-14 w-full items-center justify-center rounded-3xl p-16 text-medium-24 font-medium font-poppins transition-colors',
  {
    variants: {
      variant: {
        confirm: 'bg-orange-3 text-black-pure hover:bg-orange-3-hover',
        remove: 'bg-status-red text-white-pure font-bold shadow-md leading-loose hover:bg-status-red/90',
      },
    },
    defaultVariants: {
      variant: 'confirm',
    },
  },
);

export interface ConfirmButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVarients> {
  asChild?: boolean;
  rightIcon?: React.ReactNode;
}

const ConfirmButton = React.forwardRef<HTMLButtonElement, ConfirmButtonProps>(
  ({ className, variant, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVarients({ variant, className }))} ref={ref} {...props}>
        <div className='justify-start'>{children}</div>
      </Comp>
    );
  },
);

ConfirmButton.displayName = 'ConfirmButton';

export { buttonVarients, ConfirmButton };
