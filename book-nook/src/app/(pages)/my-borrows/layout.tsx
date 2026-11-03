import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'MyBorrows', // Automatically becomes: "BookNook | MyBorrows"
};

export default function MyBorrowsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}