import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  fullName: string;
  token: string;
  name?: string;
  email?: string;
  gender?: string;
  dob?: {
    day: string;
    month: string;
    year: string;
  };
  companyAddress?: string;
  homeAddress?: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const savedUser: User | null = JSON.parse(
  localStorage.getItem("user") || "null",
);

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
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      localStorage.removeItem("user");
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload } as User;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export type { User, AuthState };
export const {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  updateProfile,
} = authSlice.actions;
export default authSlice.reducer;
