'use client';
import * as React from 'react';
import { SplitLayout } from '@/components/auth/split-layout';
import { SignInForm } from '@/components/auth/custom/sign-in-form';
export default function Page(): React.JSX.Element {
  return (
      // <GuestGuard>
          <SplitLayout>
            <SignInForm />
          </SplitLayout>
        // </GuestGuard>
  );
}
