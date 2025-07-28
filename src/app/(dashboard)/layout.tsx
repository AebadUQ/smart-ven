"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import useSocket from "@/lib/sockets/socket";
import { AuthGuard } from "@/components/auth/auth-guard";
import { DynamicLayout } from "@/components/dashboard/layout/dynamic-layout";
import { CallContext } from "@/contexts/call-context";
import { toast } from "@/components/core/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("custom-auth-token")
      : null;
  const socket = useSocket(token || "");
  const router = useRouter();
  const {
    callData,
    setCallData,
    setAttendCall,
    attendCall,
    selectedCall,
    setSelectedCall,
    muted,
    ringtoneRef
  } = React.useContext(CallContext);
  const stopTimeoutRef = React.useRef<number | null>(null);
  

  // 2) Helper to play the ringtone
  const playRingtone = () => {
    console.log("muted", muted);
    if (!ringtoneRef.current || !muted) return;

    // reset and play
    ringtoneRef.current.currentTime = 0;
    ringtoneRef.current
      .play()
      .catch((err) => console.error("Ringtone play failed:", err));

    // clear any existing timer, then set a new one
    if (stopTimeoutRef.current !== null) {
      clearTimeout(stopTimeoutRef.current);
    }
    stopTimeoutRef.current = window.setTimeout(() => {
      stopRingtone();
    }, 30000); // 30,000 ms = 30 seconds
  };

  // 3) Helper to stop the ringtone
  const stopRingtone = () => {
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
    if (stopTimeoutRef.current !== null) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
  };

  // 4) Send “answer” back to server
  const AnswerCall = (data: any) => {
    stopRingtone();
    socket?.emit("answerCall", data);
  };

  // 5) Wire up socket events
  React.useEffect(() => {
    if (!socket) return;

    socket.on("incomingCall", (data) => {
      setCallData(data);
      playRingtone();
    });

    socket.on("startCall", (data) => {
      stopRingtone();
      setAttendCall(data);
      router.push(`/meet`);
    });

    socket.on("callAlreadyAnswered", () => {
      stopRingtone();
      toast.info("This call is already being answered.");
    });

    socket.on("callEnded", (data) => {
      stopRingtone();
      setAttendCall(null);
      setSelectedCall(null);
      setCallData(data?.data);
      toast.success(data?.message);
    });

    return () => {
      socket.off("incomingCall");
      socket.off("startCall");
      socket.off("callAlreadyAnswered");
      socket.off("callEnded");
    };
  }, [socket]);

  // 6) Clean up socket on unmount
  React.useEffect(() => {
    return () => {
      if (socket?.connected) {
        socket.disconnect();
      }
    };
  }, [socket]);

  // 7) Auto-answer if selectedCall changes
  React.useEffect(() => {
    if (selectedCall?.room) {
      AnswerCall(selectedCall);
    }
  }, [selectedCall]);

  return (
    <AuthGuard>
      {/* Hidden audio element */}
      <audio
        ref={ringtoneRef}
        src="/audio/mixkit-office-telephone-ring-1350.wav"
        loop
        style={{ display: "none" }}
      />

      {/* Optional: explicit button to “Enable Sound” */}
      {/* <button onClick={() => {
            ringtoneRef.current?.play().then(() => ringtoneRef.current!.pause());
          }}>
            Enable Sound
          </button> */}

      <DynamicLayout>{children}</DynamicLayout>
    </AuthGuard>
  );
}
