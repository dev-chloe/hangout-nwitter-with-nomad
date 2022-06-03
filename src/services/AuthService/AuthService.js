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

const AuthService = {
  signUp,
  login,
  logout
}

export default AuthService;