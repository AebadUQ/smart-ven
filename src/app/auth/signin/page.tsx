import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';
import { CenteredLayout } from '@/components/auth/centered-layout';
import { SchoolSignin } from '@/components/auth/school-admin/signin';
export const metadata = { title: `${config.site.name}` } satisfies Metadata;
export default function Page(): React.JSX.Element {
  return (
      <CenteredLayout>
        <SchoolSignin />
      </CenteredLayout>
  );
}
