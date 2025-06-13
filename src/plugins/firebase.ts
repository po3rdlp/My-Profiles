// import { defineNuxtPlugin } from '#app';
// import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';

// import { useRuntimeConfig } from "nuxt/app";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const config = useRuntimeConfig();

// export const firebaseConfig = {
//   apiKey: config.public.FIREBASE_API_KEY,
//   authDomain: config.public.FIREBASE_PUBLIC_AUTH_DOMAIN,
//   projectId: config.public.FIREBASE_PROJECT_ID,
//   storageBucket: config.public.FIREBASE_PROJECT_ID,
//   messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
//   appId: config.public.FIREBASE_APP_ID,
//   measurementId: config.public.FIREBASE_MEASUREMENT_ID,
//   databaseURL: config.public.FIREBASE_DATABASE_URL
// };



// // Initialize Firebase app
// const appFirebase = initializeApp(firebaseConfig);
// const dbFirebase = getDatabase(appFirebase);


// export default { appFirebase, dbFirebase };

import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.FIREBASE_API_KEY,
    authDomain: config.public.FIREBASE_PUBLIC_AUTH_DOMAIN,
    projectId: config.public.FIREBASE_PROJECT_ID,
    storageBucket: config.public.FIREBASE_PROJECT_ID,
    messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.public.FIREBASE_APP_ID,
    measurementId: config.public.FIREBASE_MEASUREMENT_ID,
    databaseURL: config.public.FIREBASE_DATABASE_URL
  };

  // Initialize Firebase app
  const appFirebase = initializeApp(firebaseConfig);
  const dbFirebase = getDatabase(appFirebase);

  nuxtApp.provide('appFirebase', appFirebase);
  nuxtApp.provide('dbFirebase', dbFirebase);
});

