
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SignIn', // Automatically becomes: "BookNook | SignIn"
};

export default function SignInLayout({ children }: {children: React.ReactNode}) {
  return <>{children}</>;
}