"use client";

import { viewCount } from "@/utils/viewCount";
import { useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {

  useEffect(() => {

    if (process.env.NODE_ENV !== 'production' || typeof window !== "undefined") {
      return;
    }

    const isSettedLocalstorageExpireAt = viewCount.get()

    if (!isSettedLocalstorageExpireAt) {
      viewCount.set()
      return;
    }

    const odDate = JSON.parse(isSettedLocalstorageExpireAt)
    const isExpired = viewCount.isExpiredTime({ expiresAt: odDate.expiresAt });
    if (isExpired) {
      try {
        fetch("/api/incr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });
        viewCount.set()
      } catch (error) { viewCount.set() }

    }
  }, [slug])

  return null;
};