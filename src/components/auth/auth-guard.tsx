"use client";

import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";

interface Props {
  children: ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // not logged in? kick to login
    if (!token) {
      router.replace("/auth/signin"); // adjust route if different
    }
  }, [token, router]);

  // while redirecting, render nothing (or a loader)
  if (!token) {
    return null; // or <FullScreenLoader />
  }

  return <>{children}</>;
}
