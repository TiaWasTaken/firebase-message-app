import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKeYOctPCnd2MDTeRAPRro-RvlBGSCyRo",
  authDomain: "vr-glitch-chat.firebaseapp.com",
  projectId: "vr-glitch-chat",
  storageBucket: "vr-glitch-chat.appspot.com",
  messagingSenderId: "1032762963935",
  appId: "1:1032762963935:web:10722c4c0546c425e7b66a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
