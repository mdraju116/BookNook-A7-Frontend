import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SignUp', // Automatically becomes: "BookNook | SignUp"
};

export default function SignUpLayout({ children }: {children: React.ReactNode}) {
  return <>{children}</>;
}