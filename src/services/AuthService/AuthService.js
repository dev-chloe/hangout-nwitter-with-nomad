import FirebaseRepository from "repositories/FirebaseRepository";

const signUp = ({ email, password }, setError) => {
  // TODO: ID/PW Validation

  // TODO: Password rule

  const callbackOnError = (error) => {
    /*
    * Firebase 호출시 에러가 나는 경우에 호출되는 함수:
    * 서비스를 호출하는 컴포넌트의 스테이트를 바꾸는 함수를 주입받아서 호출
    */
    setError(error.message);
  }
  FirebaseRepository.createNewAccount({ email, password, callbackOnError });
}

const login = ({ email, password }, setError) => {
  const callbackOnError = (error) => {
    setError(error.message);
  }
  FirebaseRepository.signIn({ email, password, callbackOnError })
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