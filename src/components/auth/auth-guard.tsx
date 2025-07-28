'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';

import { config } from '@/config';
import { paths } from '@/paths';
import { AuthStrategy } from '@/lib/auth/strategy';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';
import { usePathname } from 'next/navigation';
import { getModuleSlugFromPath } from '@/lib/path-to-slug';


export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const pathname = usePathname();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (!user) {
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');

      switch (config.auth.strategy) {
        case AuthStrategy.CUSTOM: {
          router.replace(paths.auth.custom.signIn);
          return;
        }
        default: {
          logger.error('[AuthGuard]: Unknown auth strategy');
          return;
        }
      }
    }

      // --- permission check: only allow if user.Modules includes the slug ---
  //  const requiredSlug = getModuleSlugFromPath(pathname);
  //  if (requiredSlug && !user?.Modules?.some(m => m.slug === requiredSlug)) {
  //    logger.warn(`[AuthGuard]: User lacks module permission "${requiredSlug}", redirecting`);
  //    router.replace(paths.notAuthorized);
  //    return;
  //  }


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
