import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../Firebase";

const createNewAccount = async ({
  email,
  password,
  callbackError = (error) => {
    console.log(("[ERROR] createNewAccount >", error));
  }
}) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .catch(callbackError);
};

const signIn = async ({
  email,
  password,
  callbackError = (error) => {
    console.log(("[ERROR] signIn >", error));
  }
}) => {
  await signInWithEmailAndPassword(auth, email, password).catch(callbackError);
};

const signInWithAuthProvider = async (authProvider) => {
  await signInWithPopup(auth, authProvider);
};

const signOut = async () => {
  auth.signOut();
};

const checkAuthState = async (callback) => {
  auth.onAuthStateChanged(callback);
};

const saveProfile = async (
  profile,
  successCallback = () => console.error("[FIXME] Not implemented! (for then) >"),
  errorCallback = (error) => console.error("[FIXME] Not implemented! (for catch) >", error)
) => {
  // Ref. https://firebase.google.com/docs/auth/web/manage-users?hl=ko#update_a_users_profile
  updateProfile(auth.currentUser, profile)
    .then(() => successCallback())
    .catch((error) => errorCallback(error));
};

const AuthRepository = {
  createNewAccount,
  signIn,
  signInWithAuthProvider,
  signOut,
  checkAuthState,
  saveProfile
};

export default AuthRepository;