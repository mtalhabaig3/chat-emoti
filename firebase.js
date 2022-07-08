import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
import { Logs } from "expo";

const firebaseConfig = {
  apiKey: "AIzaSyB9T15QrtAknWOIAmYyQ9kNe6TPapp6QlA",
  authDomain: "myfyp-96da7.firebaseapp.com",
  projectId: "myfyp-96da7",
  storageBucket: "myfyp-96da7.appspot.com",
  messagingSenderId: "1008461113488",
  appId: "1:1008461113488:web:e44294a70b75e3c6315015",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function SignOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
  // return signOut(auth);
}
