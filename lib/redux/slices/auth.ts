import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  isLoggedIn: boolean;
  signUpMail: string;
}

const initialState: IState = {
  isLoggedIn: true,
  signUpMail: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setSignUpMail: (state, action: PayloadAction<string>) => {
      state.signUpMail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoggedIn, setSignUpMail } = authSlice.actions;

export default authSlice.reducer;
