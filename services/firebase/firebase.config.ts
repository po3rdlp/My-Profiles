// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { useRuntimeConfig } from "nuxt/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = useRuntimeConfig();

// const firebaseConfig = {
//   apiKey: config.public.FIREBASE_API_KEY,
//   authDomain: config.public.FIREBASE_PUBLIC_AUTH_DOMAIN,
//   projectId: config.public.FIREBASE_PROJECT_ID,
//   storageBucket: config.public.FIREBASE_PROJECT_ID,
//   messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
//   appId: config.public.FIREBASE_APP_ID,
//   measurementId: config.public.FIREBASE_MEASUREMENT_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// //const analytics = getAnalytics(app);

// const FIREBASE_DATABASE = getFirestore(app);

// export default FIREBASE_DATABASE;
const firebaseConfig = {
  apiKey: "AIzaSyBRlferB3Lt6IWm4UVa8fcj34K_12-x7EY",
  authDomain: "profiles-c0e07.firebaseapp.com",
  projectId: "profiles-c0e07",
  storageBucket: "profiles-c0e07.appspot.com",
  messagingSenderId: "768840946512",
  appId: "1:768840946512:web:7b4ffac9547e105081d255"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);