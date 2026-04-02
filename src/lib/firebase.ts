import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase for SSR compatibility
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (typeof window !== "undefined" || process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  if (getApps().length > 0) {
    app = getApp();
  } else {
    // Only initialize if we have a config (prevents build-time crashes)
    if (firebaseConfig.apiKey) {
      app = initializeApp(firebaseConfig);
    } else {
      // Fallback or dummy app for build time (will error at runtime if keys missing, which is correct)
      app = {} as FirebaseApp; 
    }
  }
  
  if (app && Object.keys(app).length > 0) {
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    // Dummy exports to prevent "not defined" errors during build transpilation
    auth = {} as Auth;
    db = {} as Firestore;
  }
} else {
  // SSR / Build fallback
  app = {} as FirebaseApp;
  auth = {} as Auth;
  db = {} as Firestore;
}

export { auth, db, app };

