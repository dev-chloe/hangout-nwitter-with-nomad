import FirebaseRepository from "repositories/FirebaseRepository";

const signUp = ({ email, password }) => {
  // TODO: Password rule
  FirebaseRepository.createNewAccount({ email, password });
}

const login = ({ email, password }) => {
  FirebaseRepository.signIn({ email, password })
}

const logout = () => {
  FirebaseRepository.signOut();
}

const refresh = (callback) => {
  FirebaseRepository.changeAuthState(callback)
}

const saveProfile = (profile) => {
  FirebaseRepository.saveProfile(profile);
}

const AuthService = {
  signUp,
  login,
  logout,
  refresh,
  saveProfile,
}

export default AuthService;