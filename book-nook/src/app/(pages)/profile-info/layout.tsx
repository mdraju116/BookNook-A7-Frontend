import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'MyProfile', // Automatically becomes: "BookNook | MyProfile"
};

// Layout boundary for account and profile settings.
export default function MyProfileLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
