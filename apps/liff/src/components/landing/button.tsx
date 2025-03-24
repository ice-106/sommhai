interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

export function Button({ name }: ButtonProps) {
  return (
    <button className='w-40 rounded-2xl bg-orange-500 py-2 text-white transition-colors hover:bg-orange-600'>
      {name}
    </button>
  );
}
