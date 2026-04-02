import { useState, useCallback } from "react";
import { db } from "@/lib/firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

type WaitlistStatus = "idle" | "loading" | "success" | "error";

interface UseWaitlistReturn {
  status: WaitlistStatus;
  submitEmail: (email: string, recaptchaToken?: string) => Promise<boolean>;
  resetStatus: () => void;
}


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function useWaitlist(): UseWaitlistReturn {
  const [status, setStatus] = useState<WaitlistStatus>("idle");
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const resetStatus = useCallback(() => setStatus("idle"), []);

  const submitEmail = async (email: string, recaptchaToken?: string): Promise<boolean> => {
    // 1. Basic Validation
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      setStatus("error");
      return false;
    }

    // 2. Simple Client-side Rate Limiting (1 submission per 5 seconds)
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      console.warn("Too many submissions. Please wait.");
      return false;
    }

    setStatus("loading");
    setLastSubmitTime(now);

    try {
      // 3. Call the Secure API route with reCAPTCHA
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, recaptchaToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Waitlist Error:", data.error);
        setStatus("error");
        return false;
      }

      setStatus("success");
      return true;
    } catch (error) {
      console.error("Waitlist Error:", error);
      setStatus("error");
      return false;
    }
  };

  return { status, submitEmail, resetStatus };
}

