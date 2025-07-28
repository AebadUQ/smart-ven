// src/context/CallContext.js
"use client";

import React, { createContext, useState } from "react";

export const CallContext = createContext();

export const CallProvider = ({ children }) => {
  const [selectedCall, setSelectedCall] = useState(null);
  const [callData, setCallData] = useState(null);
  const [attendCall, setAttendCall] = useState(null);
  const [muted, setMuted] = useState(true);
  const ringtoneRef = React.useRef<HTMLAudioElement>(null);
  
  const unlockAudio = () => {
    if (ringtoneRef.current) {
      ringtoneRef.current
        .play()
        .then(() => {
          ringtoneRef.current!.pause();
          ringtoneRef.current!.currentTime = 0;
        })
        .catch(console.warn);
    }
  };


  return (
    <CallContext.Provider value={{ callData, setCallData , attendCall , setAttendCall ,selectedCall, setSelectedCall, muted, setMuted , unlockAudio, ringtoneRef }}>
      {children}
    </CallContext.Provider>
  );
};
