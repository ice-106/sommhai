import { Slot } from '@radix-ui/react-slot';
import { cn } from '@sommhai/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const buttonVarients = cva(
  'relative inline-flex h-14 w-full items-center justify-center rounded-3xl p-16 text-medium-24 font-medium font-poppins transition-colors',
  {
    variants: {
      variant: {
        Accept: 'bg-status-green text-white-pure hover:bg-status-green/90 text-xl',
        Deny: 'bg-status-red text-white-pure shadow-md leading-loose hover:bg-status-red/90 text-xl',
      },
    },
    defaultVariants: {
      variant: 'Accept',
    },
  },
);

export interface AcceptButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVarients> {
  asChild?: boolean;
  rightIcon?: React.ReactNode;
}

const AcceptButton = React.forwardRef<HTMLButtonElement, AcceptButtonProps>(
  ({ className, variant, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVarients({ variant, className }))} ref={ref} {...props}>
        <div className='justify-start'>{children}</div>
      </Comp>
    );
  },
);

AcceptButton.displayName = 'AcceptButton';

export { AcceptButton, buttonVarients };
