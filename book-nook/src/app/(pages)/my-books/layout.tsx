import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'MyBooks', // Automatically becomes: "BookNook | MyBooks"
};

// Layout boundary for books owned or contributed by the current reader.
export default function MyBooksLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
