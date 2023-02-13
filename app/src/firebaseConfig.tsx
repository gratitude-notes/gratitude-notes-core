import dotenv from "dotenv";

dotenv.config(); // Load up `./env.local`

// Firebase Configuration
export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: "gratitudenotes",
  storageBucket: "gratitudenotes.appspot.com",
  messagingSenderId: "73810251457",
  appId: "1:73810251457:web:228046b03dbaddcd55ce40"
};