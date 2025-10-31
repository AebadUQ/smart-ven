"use client";

import * as React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";

export default function Page(): React.JSX.Element {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/auth/signin");
    }
  }, [token, router]);

  return <div></div>;
}
