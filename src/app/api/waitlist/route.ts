import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
const SCRIPT_TOKEN = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_TOKEN;

export async function POST(request: Request) {
  try {
    const { email, recaptchaToken } = await request.json();

    if (!email || !recaptchaToken) {
      return NextResponse.json({ error: "Email and reCAPTCHA are required" }, { status: 400 });
    }

    // 1. Verify reCAPTCHA token
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`;
    const verifyResponse = await fetch(verifyUrl, { method: "POST" });
    const verifyData = await verifyResponse.json();

    if (!verifyData.success || verifyData.score < 0.5) {
      return NextResponse.json({ error: "Fallo en la verificación de seguridad (reCAPTCHA)" }, { status: 403 });
    }

    // 2. Save to Firebase Firestore (potential_clients)
    const cleanEmail = email.toLowerCase().trim();
    const waitlistRef = doc(db, "potential_clients", cleanEmail);
    
    await setDoc(waitlistRef, {
      email: cleanEmail,
      status: "lead",
      registeredAt: serverTimestamp(),
      source: "landing_page_waitlist",
      recaptchaScore: verifyData.score
    }, { merge: true });

    // 3. Notify via Google Apps Script (gorilapp.fit@gmail.com)
    if (SCRIPT_URL && SCRIPT_URL.includes("script.google.com")) {
      try {
        await fetch(SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: cleanEmail,
            token: SCRIPT_TOKEN,
            type: "welcome",
            target: "gorilapp.fit@gmail.com" // Inform the script specifically
          }),
        });
      } catch (err) {
        console.error("Notification failed:", err);
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Waitlist API Error:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
