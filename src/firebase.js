import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyByVAdsFzBQvxtRNlM-6hFdTOseP1vnRKk",
  authDomain: "app-c7b71.firebaseapp.com",
  projectId: "app-c7b71",
  storageBucket: "app-c7b71.firebasestorage.app",
  messagingSenderId: "259139309727",
  appId: "1:259139309727:web:2b47ab20b59bc9b498d2aa",
  databaseURL: "https://app-c7b71-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);