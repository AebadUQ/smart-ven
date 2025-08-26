'use client';

import { ReactNode } from 'react';
import  GuestGuard from '@/components/auth/guest-guard';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>;
}
