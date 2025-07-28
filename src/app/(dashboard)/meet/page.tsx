'use client';
import React, { useContext, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import { useRouter } from "next/navigation";
import { CallContext } from '@/contexts/call-context'; // Ensure this is correctly imported
import { paths } from "@/paths";

export default function Page(): React.JSX.Element {
  const { attendCall } = useContext(CallContext);
  const iframeRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    if (!attendCall?.roomId) {
      router.replace(paths.dashboard.callCenter);
    }
  }, [attendCall, router]);

  if (!attendCall?.roomId) {
    return <></>; // Prevents rendering anything while redirecting
  }

   // fire once per attendCall change, when the <iframe> actually loads
useEffect(() => {
  if (!iframeRef.current || !attendCall) return;
  const handleMessage = (event: MessageEvent) => {
    if (event.data === 'REQUEST_PARENT_DATA') {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: 'ROOM_PAYLOAD',
            data: attendCall, // or roompayload if that's your variable
          },
          '*' // or replace with specific iframe origin
        );
      }
    }
  };
  window.addEventListener('message', handleMessage);
  return () => {
    window.removeEventListener('message', handleMessage);
  };
}, [attendCall]);
  

  

  return (
    <Box
      component="main"
      sx={{
        display: 'grid',
        flex: '1 1 auto',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
        minHeight: '100%',
      }}
    >
      <iframe
      ref={iframeRef}
        src={`${process.env.NEXT_PUBLIC_IFRAME_TARGET_ORIGIN}`}
        allow="camera; microphone; autoplay; clipboard-write; encrypted-media;"
        allowFullScreen
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          position: "absolute",
          top: 0,
          left: 0
        }}
      ></iframe>
    </Box>
  );
}
