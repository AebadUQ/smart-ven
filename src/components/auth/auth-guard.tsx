'use client';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';

interface Props {
  children: ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { token } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.replace('/auth/admin');
  }, [token, router]);

  if (!token) return <div>Loading...</div>; // loader while checking

  return <>{children}</>;
}
