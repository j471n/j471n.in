import * as admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";

// Initialize the Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  });
}

// Get the Firebase Database client instance
const db = getDatabase();

// Get a reference to the 'views' key in the database
const ref = db.ref("views");

// Export the database client instance and reference
export { db, ref };
