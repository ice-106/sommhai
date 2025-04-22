import { Button } from '@sommhai/ui/components/ui/button';

export function DeleteEventButton() {
  return (
    <Button className='h-[56px] w-full' variant='delete'>
      Remove Event
    </Button>
  );
}

type ConfirmButtonProps = {
  onClick?: () => void;
};

export function ConfirmButton({ onClick }: ConfirmButtonProps) {
  return (
    <button
      className='rounded-24 bg-orange-3 text-medium-20 mx-auto mt-24 h-[56px] w-full max-w-[345px]'
      onClick={onClick}
    >
      Confirm
    </button>
  );
}
