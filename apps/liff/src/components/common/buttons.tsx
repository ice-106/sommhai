import { Button } from '@sommhai/ui/components/ui/button';
import Link from 'next/link';

export default function LinkButton({ href, name }: { href: string; name: string }) {
  return (
    <Link className='' href={href}>
      <Button>{name}</Button>
    </Link>
  );
}
