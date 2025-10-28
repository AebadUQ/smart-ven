'use client';
import * as React from 'react';
import { SplitLayout } from '@/components/auth/split-layout';
import { SignInForm } from '@/components/auth/custom/sign-in-form';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function Page(): React.JSX.Element {
  const { token } = useSelector((state: RootState) => state.auth)
  return (
//    <>
//     {!token ? <SplitLayout>
//       <SignInForm />
//     </SplitLayout> : null
// }</>
       <SplitLayout>
      <SignInForm />
    </SplitLayout>  
  );
}
