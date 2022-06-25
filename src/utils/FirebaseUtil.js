import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const Google = "google";
const Github = "github";

const getAuthProvider = (providerName) => {
  if (!providerName || providerName === "") {
    throw new Error("Invalid providerName");
  }
  switch (providerName) {
    case Google:
      return new GoogleAuthProvider();
    case Github:
      return new GithubAuthProvider();
    default:
      throw new Error(`No AuthProvider implementations: ${providerName}`);
  }
}

const FirebaseUtil = {
  Google,
  Github,
  getAuthProvider,
}

export default FirebaseUtil;