import Navbar from '@/components/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-dvh w-screen flex-col justify-between bg-fuchsia-300'>
      {children}
      <Navbar />
    </div>
  );
}
