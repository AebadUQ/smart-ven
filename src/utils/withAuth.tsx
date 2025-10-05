// hoc/withAuth.tsx
'use client';

import React, { useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    const { token } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push('/auth/signin'); // redirect if not logged in
      }
    }, [token, router]);

    if (!token) {
      // Optional: return a loader while checking auth
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
