import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';
import { CenteredLayout } from '@/components/auth/centered-layout';
import { ForgetPassword } from '@/components/auth/school-admin/forgetpassword';
export const metadata = { title: `${config.site.name}` } satisfies Metadata;
export default function Page(): React.JSX.Element {
  return (
      <CenteredLayout>
        <ForgetPassword />
      </CenteredLayout>
  );
}
