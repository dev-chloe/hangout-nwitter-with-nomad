import FirebaseRepository from "components/repositories/FirebaseRepository/FirebaseRepository";

const signUp = ({ email, password }) => {
  FirebaseRepository.createNewAccount({ email, password });
}

const login = ({ email, password }) => {
  FirebaseRepository.signIn({ email, password });
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
  logout,
  refresh,
  saveProfile,
}

export default AuthService;