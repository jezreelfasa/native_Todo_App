//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';

//web app's Firebase configuration
const firebaseConfig: "",
  authDomain: "for-react-native-f14f3.firebaseapp.com",
  projectId: "for-react-native-f14f3",
  storageBucket: "for-react-native-f14f3.appspot.com",
  messagingSenderId: "760055452028",
  appId: "1:760055452028:web:56c8c6446321567fe854f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Export Auth and Storage
export { auth };
export const storage = getStorage(app);
export const firestore = getFirestore(app)
