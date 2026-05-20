import { RootState } from "../../store/store";
import { User } from "./auth.slice";

export const selectUser = (state: RootState): User | null => state.auth.user;

export const selectIsLoggedIn = (state: RootState): boolean =>
  state.auth.isLoggedIn;

export const selectAuthLoading = (state: RootState): boolean =>
  state.auth.loading;

export const selectAuthError = (state: RootState): string | null =>
  state.auth.error;
