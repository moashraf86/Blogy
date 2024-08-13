/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer, useState } from "react";
import { auth, provider, db } from "../utils/firebase";
import {
  signInWithPopup,
  onAuthStateChanged,
  signInAnonymously,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

// create a context for Authentication
export const AuthContext = createContext();

// create a provider for the AuthContext
export const AuthProvider = ({ children }) => {
  // create a reducer for the current user state
  const currentUserReducer = (currentUser, action) => {
    switch (action.type) {
      case "SIGN_IN":
        return action.payload;
      case "SIGN_OUT":
        return action.payload;
      case "UPDATE_USER":
        return {
          ...currentUser,
          ...action.payload,
        };
      default:
        return currentUser;
    }
  };
  // fetch the current user from local storage if it exists
  const initialCurrentUser = JSON.parse(localStorage.getItem("currentUser"));

  // create a state for the current user
  const [currentUser, dispatch] = useReducer(
    currentUserReducer,
    initialCurrentUser
  );
  const [loading, setLoading] = useState(false);

  /**
   * Detect if the Guest user after sign out
   */
  const deleteGuestUsers = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users"),
      where("isGuest", "==", true)
    );
    querySnapshot.forEach(async (doc) => {
      const user = doc.data();
      // check if the user is a guest and the user is inactive
      if (user.isGuest && !user.isActive) {
        await deleteDoc(doc.ref);
      }
    });
  };

  useEffect(() => {
    // update the current user state when the user signs in or signs out
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // if user is signed in, update the current user state
      if (user) {
        setLoading(true);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            name: user.displayName || "Anonymous",
            email: user.email,
            photoURL: user.photoURL,
            id: user.uid,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            isActive: true,
            bookmarks: [],
            isGuest: user.isAnonymous,
          });
          // get the user data from the database
          const newUserSnap = await getDoc(userRef);
          dispatch({ type: "SIGN_IN", payload: newUserSnap.data() });
          setLoading(false);
        } else {
          await updateDoc(userRef, {
            lastLogin: serverTimestamp(),
            isActive: true,
          });
          dispatch({ type: "SIGN_IN", payload: userSnap.data() });
          setLoading(false);
        }
      }
    });

    /**
     * - store the user data in local storage when the user signs in
     * - remove the user data from local storage when the user signs out
     **/
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }

    return () => unsubscribe();
  }, []);

  /**
   * Sign in with Google
   */
  const signIn = async () => {
    try {
      setLoading(true);
      if (currentUser) {
        /**
         * - if there's signed in users, sign Them out
         * - delete Guest users data from firebase
         */
        signOut();
        deleteGuestUsers();
      }
      // sign in with Google
      await signInWithPopup(auth, provider);
      // sign in with Google
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  /**
   * Sign out
   */
  const signOut = async () => {
    try {
      await auth.signOut();
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.id);
        await updateDoc(userRef, {
          isActive: false,
        });
        deleteGuestUsers();
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "SIGN_OUT", payload: null });
      setLoading(false);
    }
  };

  /**
   * Sign in as Guest
   */
  const signInAsGuest = async () => {
    try {
      // if there's a user signed in, sign them out
      if (currentUser) {
        return;
      }
      // sign in anonymously
      await signInAnonymously(auth);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        signIn,
        signOut,
        signInAsGuest,
        updateUser: (data) => dispatch({ type: "UPDATE_USER", payload: data }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
