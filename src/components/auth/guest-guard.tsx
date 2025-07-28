'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';
import { layoutConfig } from '../dashboard/layout/config';

export interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);


  const redirectToFirstAllowed = (): void => {
    // collect slugs of modules user has access to
    const allowed = new Set(user?.Modules?.map((m: any) => m.slug));

    // find first nav section they’re allowed to see
    for (const section of layoutConfig.navItems) {
      if (!allowed.has(section.key)) continue;

      // drill down to the first available href
      const item = section.items?.[0];
      if (!item) break;

      // if it has nested items, pick its first
      const target =
        'href' in item && item.href
          ? item.href
          : Array.isArray(item.items) && item.items.length > 0
          ? item.items[0].href
          : null;

      if (target) {
        router.replace(target);
        return;
      }
    }

    // fallback: dashboard overview
    router.replace(paths.dashboard.overview);
  };



  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (user) {
      
       logger.debug('[GuestGuard] redirecting to first allowed module');
      redirectToFirstAllowed();
      return;
     }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
