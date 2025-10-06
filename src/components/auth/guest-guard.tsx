'use client';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Props {
  children: ReactNode;
}

export default function GuestGuard({ children }: Props) {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (token) router.replace('/dashboard');
  }, [token, router]);

  if (token) return null;

  return <>{children}</>;
}
