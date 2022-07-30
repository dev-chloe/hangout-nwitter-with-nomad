import { configureStore } from "@reduxjs/toolkit";
import userReducer from "services/AuthService/userSlice";

export default configureStore({
  reducer: {
    user: userReducer
  }
});