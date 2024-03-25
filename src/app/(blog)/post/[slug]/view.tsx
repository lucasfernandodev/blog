"use client";

import { viewCount } from "@/utils/viewCount";
import { useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {

  async function setView({ slug }: { slug: string }) {
    try {
      await fetch("/api/incr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });
    } catch (error) {
      console.log("REPORT VIEW", error)
    }
  }

  useEffect(() => {

    const isSettedLocalstorageExpireAt = viewCount.get()

    if (isSettedLocalstorageExpireAt) {
      const odDate = JSON.parse(isSettedLocalstorageExpireAt);
      const isExpired = viewCount.isExpiredTime({ expiresAt: odDate.expiresAt });

      if (isExpired) {
        setView({ slug }).catch(console.error)
        viewCount.set()
      }
      return;
    }

    if (!isSettedLocalstorageExpireAt) {
      setView({ slug }).catch(console.error)
    }
  }, [slug])

  return null;
};