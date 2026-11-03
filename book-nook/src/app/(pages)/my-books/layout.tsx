import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'MyBooks', // Automatically becomes: "BookNook | MyBooks"
};

export default function MyBooksLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}