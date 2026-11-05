import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'MyBorrows', // Automatically becomes: "BookNook | MyBorrows"
};

// Layout boundary for the reader's active borrowing history.
export default function MyBorrowsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
