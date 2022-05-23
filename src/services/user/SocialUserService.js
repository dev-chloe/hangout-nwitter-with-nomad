import { authService } from "fBase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// 키워드
const google = "google"
const github = "github"
const socialBtnName = {
  google,
  github
}

// 공통 - 키워드 검사
const isValidName = (targetName) => !targetName || typeof targetName != "string"

// 구글
const loginWithGoogle = async () => {
  await signInWithPopup(authService, new GoogleAuthProvider());
}

// 깃허브
const loginWithGithub = async () => {
  await signInWithPopup(authService, new GithubAuthProvider());
  // FIXME https://firebase.google.com/docs/auth/web/github-auth?authuser=0
}

// 소셜 로그인
const login = async (targetName) => {
  if (isValidName(targetName)) {
    console.error(`Invalid event (targetName: ${targetName})`);
    return;
  }
  switch (targetName.toLowerCase()) {
    case google:
      await loginWithGoogle();
      break;
    case github:
      await loginWithGithub();
      break;
    default:
      console.error(`Not implemented event (targetName: ${targetName})`);
  }
}

const SocialUserService = {
  login,
}

export default SocialUserService;

export {
  socialBtnName,
}
