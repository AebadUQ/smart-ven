import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { SignUpForm } from '@/components/auth/custom/sign-up-form';
import { SplitLayout } from '@/components/auth/split-layout';

export const metadata = { title: `Sign up | Custom | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
      <SplitLayout>
        <SignUpForm />
      </SplitLayout>
  );
}
