import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storageService } from "../../services/storage.service";
import { User } from "../../types/auth.types";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const savedUser = storageService.getUser();

const initialState: AuthState = {
  user: savedUser || null,
  isLoggedIn: !!savedUser,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      _action: PayloadAction<{ email: string; password: string }>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfile: (state, _action: PayloadAction<Partial<User>>) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export type { AuthState };
export type { User } from "../../types/auth.types";
export const {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  updateProfile,
  updateProfileSuccess,
  updateProfileFailure,
} = authSlice.actions;
export default authSlice.reducer;
