import { auth, storage, firestore } from '../zConfig/firebaseConfiguration';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';

//import { doc, setDoc} from 'firebase/firestore';

/*Upload an image to Firebase Storage
export const uploadImage = async (uri) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, `images/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, blob);

        return getDownloadURL(storageRef);
    } catch (error) {
        throw new Error('Image upload failed: ' + error.message);
    }
};*/

/*export const signUpWithUsername = async (email, password, username) => {
    try {
        // Step 1: Create the user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Step 2: Save the username and other data to Firestore
        const userDocRef = doc(firestore, "users", user.uid); // Reference to the user's Firestore document
        await setDoc(userDocRef, {
            email: email,
            username: username,
            createdAt: new Date(),
        });

        return user; // Optionally return the user object
    } catch (error) {
        throw new Error(error.message); // Handle errors
    }
};

*/


export const signUp = async (email, password) => {
   try {
      return await createUserWithEmailAndPassword(auth, email, password)
   } catch (error) {
      throw new Error("Registration failed", error.message)
   }
}

// Log in with email and password
export const logIn = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
};

// Log out the currently logged-in user
export const logOut = async () => {
   return await signOut(auth);
}

