'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

import { useSettings } from '@/hooks/use-settings';
import { CallContext } from '@/contexts/call-context'; // Ensure this is correctly imported

import { HorizontalLayout } from './horizontal/horizontal-layout';
import { VerticalLayout } from './vertical/vertical-layout';
import { useContext } from 'react';

export interface DynamicLayoutProps {
  children: React.ReactNode;
}

export function DynamicLayout({ children }: DynamicLayoutProps): React.JSX.Element {
  const { settings } = useSettings();
  const pathname = usePathname();
  const { attendCall } = useContext(CallContext);
  const isMeetRoute = pathname === '/meet' && attendCall?.roomId;
  const isPdfRoute = pathname.startsWith('/form/') && pathname.endsWith('/pdf');

  if (isMeetRoute || isPdfRoute) {
    return <>{children}</>;
  }

  return settings.layout === 'horizontal' ? (
    <HorizontalLayout>{children}</HorizontalLayout>
  ) : (
    <VerticalLayout>{children}</VerticalLayout>
  );
}
