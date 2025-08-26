import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { SignInForm } from '@/components/auth/custom/sign-in-form';
import { SplitLayout } from '@/components/auth/split-layout';
import { CenteredLayout } from '@/components/auth/centered-layout';

export const metadata = { title: `Sign in | Custom | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
      <CenteredLayout>
        <SignInForm />
      </CenteredLayout>
  );
}
