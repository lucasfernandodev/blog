'use client';

import { useEffect } from "react";

export const AutoDisconnectDraftMode = () => {
  useEffect(() => {
    const handleUnload = () => {
      const closeConnection = async () => {
        await fetch("/api/disable-draft");
      }

      closeConnection().catch(console.error)
    };
    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [])

  return <></>
}