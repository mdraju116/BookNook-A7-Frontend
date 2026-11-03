import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AddBook', // Automatically becomes: "BookNook | AddBook"
};

export default function AddBookLayout({ children }: {children: React.ReactNode}) {
  return <>{children}</>;
}