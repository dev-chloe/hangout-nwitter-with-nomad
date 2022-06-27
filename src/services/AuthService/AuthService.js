import FirebaseRepository from "repositories/FirebaseRepository/FirebaseRepository";
import FirebaseUtil from "utils/FirebaseUtil";

const signUp = ({ email, password }) => {
  FirebaseRepository.createNewAccount({ email, password });
}

const login = ({ email, password }) => {
  FirebaseRepository.signIn({ email, password });
}

const popupLogin = (authProviderName) => {
  const authProvider = FirebaseUtil.getAuthProvider(authProviderName);
  FirebaseRepository.signInWithAuthProvider(authProvider);
}

const logout = () => {
  FirebaseRepository.signOut();
}

const refresh = (callback) => {
  FirebaseRepository.checkAuthState(callback);
}

const saveProfile = (profile, successCallback, errorCallack) => {
  FirebaseRepository.saveProfile(profile, successCallback, errorCallack);
}

const AuthService = {
  signUp,
  login,
  popupLogin,
  logout,
  refresh,
  saveProfile,
}

export default AuthService;