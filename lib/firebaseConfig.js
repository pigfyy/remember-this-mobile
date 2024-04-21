import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDM0KUIDx5RcfD3jZGgkZneITOzVu9jNlg",
  authDomain: "remember-this-mobile.firebaseapp.com",
  projectId: "remember-this-mobile",
  storageBucket: "remember-this-mobile.appspot.com",
  messagingSenderId: "1052262242216",
  appId: "1:1052262242216:web:36e5f420a6b936f2ceef9d",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, storage, db };
