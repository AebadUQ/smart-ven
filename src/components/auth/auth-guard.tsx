// 'use client';
// import { ReactNode, useEffect } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store';

// interface Props {
//   children: ReactNode;
// }

// export default function AuthGuard({ children }: Props) {
//   const token = useSelector((state: RootState) => state.auth.token);
//   console.log("state",token)
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     if (token) {
//       // if (pathname.startsWith('/auth')) {
//         router.replace('/dashboard');
//       // }
//     } else {
//       if (!pathname.startsWith('/auth')) {
//         router.replace('/auth/signin');
//       }
//     }
//   }, [token, pathname, router]);

//   if (
//     (!token && !pathname.startsWith('/auth')) ||
//     (token && pathname.startsWith('/auth'))
//   ) {
//     return <div>Loading...</div>;
//   }

//   return <>{children}</>;
// }
'use client';
import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Props {
  children: ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const token = useSelector((state: RootState) => state.auth.token);
  console.log("state",token)
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (token) {
      if (pathname.startsWith('/auth')) {
        router.replace('/dashboard');
      }
    } else {
      if (!pathname.startsWith('/auth')) {
        router.replace('/auth/signin');
      }
    }
  }, [token, pathname, router]);

  if (
    (!token && !pathname.startsWith('/auth')) ||
    (token && pathname.startsWith('/auth'))
  ) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}