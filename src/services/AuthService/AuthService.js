import FirebaseRepository from "components/repositories/FirebaseRepository/FirebaseRepository";
import Profile from "routes/Profile/Profile";

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