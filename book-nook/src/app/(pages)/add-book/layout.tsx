import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AddBook', // Automatically becomes: "BookNook | AddBook"
};

// Layout for the authenticated book-contribution flow.
export default function AddBookLayout({ children }: {children: React.ReactNode}) {
  return <>{children}</>;
}
