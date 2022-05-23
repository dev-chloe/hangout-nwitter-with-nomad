import { authService } from "fBase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// 회원 가입 
const join = async ({ email, password }) => {
  try {
    await createUserWithEmailAndPassword(authService, email, password);
    return null;
  } catch (e) {
    return e.message;
  }
}

// 로그인
const login = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(authService, email, password);
    return null;
  } catch (e) {
    return e.message;
  }
}

const BasicUserSerivce = {
  join,
  login
}

export default BasicUserSerivce;
