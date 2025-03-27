export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='flex h-dvh w-screen flex-col justify-between'>{children}</div>;
}
