import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SignUp', // Automatically becomes: "BookNook | SignUp"
};

// Provides the shared presentation wrapper for account creation.
export default function SignUpLayout({ children }: {children: React.ReactNode}) {
  return <>{children}</>;
}
