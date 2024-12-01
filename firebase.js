import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAOS5Vmbp6iEu7mPTXNBd3-7Or2TaCC0oE",
  authDomain: "ethioplant.firebaseapp.com",
  projectId: "ethioplant",
  storageBucket: "ethioplant.firebasestorage.app",
  messagingSenderId: "807318466467",
  appId: "1:807318466467:web:334b4ff0c9d589e0e9b416",
  measurementId: "G-2CWWBJXL2X",
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
const storage = getStorage(app);
export { db, auth, storage, app };
