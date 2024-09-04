// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyC04VrwrsqvJKsPl5kZQFHfWkELTSUgOUA",
    authDomain: "app-evaluacion-docente.firebaseapp.com",
    projectId: "app-evaluacion-docente",
    storageBucket: "app-evaluacion-docente.appspot.com",
    messagingSenderId: "1039249215972",
    appId: "1:1039249215972:web:ba3977cb62dc0187ea77f1",
    measurementId: "G-KTV9FBYYYJ"
  }
};


  // Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
