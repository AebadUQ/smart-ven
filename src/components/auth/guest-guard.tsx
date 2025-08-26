'use client';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';

interface Props {
  children: ReactNode;
}

export default function GuestGuard({ children }: Props) {
  const { token } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (token) router.replace('/dashboard');
  }, [token, router]);

  if (token) return null; // prevent flash

  return <>{children}</>;
}
