import { AuthErrorCodes } from "firebase/auth";
import FirebaseRepository from "repositories/FirebaseRepository";
import FirebaseUtil from "utils/FirebaseUtil";

const signUp = ({ email, password }, setError) => {
  const handleSignUpError = (error) => {
    switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      setError("이미 사용 중인 이메일입니다.");
      break;
    case AuthErrorCodes.WEAK_PASSWORD:
      setError("비밀번호는 6자리 이상으로 설정해주세요.");
      break;
    default:
      console.error(error);
      setError("회원가입 과정이 원활하지 않습니다. 잠시 후 재시도 해주세요.");
    }
  };
  FirebaseRepository.createNewAccount({
    email,
    password,
    callbackError: handleSignUpError
  });
};

const login = ({ email, password }, setError) => {
  const hadleLoginError = (error) => {
    switch (error.code) {
    case AuthErrorCodes.INVALID_PASSWORD:
    case AuthErrorCodes.USER_DELETED:
      console.debug(error.code);
      setError("이메일 또는 비밀번호를 다시 한번 확인해주세요.");
      break;
    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
      setError("로그인 시도 횟수가 초과 되었습니다. 잠시 후 재시도 해주세요.");
      break;
    default:
      console.error(error);
      setError("로그인 과정이 원활하지 않습니다. 잠시 후 재시도 해주세요.");
    }
  };
  FirebaseRepository.signIn({
    email,
    password,
    callbackError: hadleLoginError
  });
};

const popupLogin = (authProviderName) => {
  const authProvider = FirebaseUtil.getAuthProvider(authProviderName);
  FirebaseRepository.signInWithAuthProvider(authProvider);
};

const logout = () => {
  FirebaseRepository.signOut();
};

const refresh = (callback) => {
  FirebaseRepository.checkAuthState(callback);
};

const saveProfile = (profile, successCallback, errorCallack) => {
  FirebaseRepository.saveProfile(profile, successCallback, errorCallack);
};

const AuthService = {
  signUp,
  login,
  popupLogin,
  logout,
  refresh,
  saveProfile
};

export default AuthService;