import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userReducer",
  initialState: {
    displayName: "",
    uid: "",
    email: ""
  },
  reducers: {
    userUpdate: (state, action) => {
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },
    userLogout: (state) => {
      state.displayName = "";
      state.uid = "";
      state.email = "";
    }
  }
});

export const {
  userUpdate,
  userLogout
} = userSlice.actions;

export default userSlice.reducer;