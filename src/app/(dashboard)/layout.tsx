"use client";
import * as React from "react";
import { VerticalLayout } from "@/components/dashboard/layout/vertical/vertical-layout";
import AuthGuard from "@/components/auth/auth-guard";
interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    // <AuthGuard>
      <VerticalLayout>{children}</VerticalLayout>
    // </AuthGuard>
  );
}
