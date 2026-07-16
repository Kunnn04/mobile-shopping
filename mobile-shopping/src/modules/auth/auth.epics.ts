import { ofType } from "redux-observable";
import { of, Observable } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { Action } from "@reduxjs/toolkit";
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  updateProfile,
  updateProfileSuccess,
  updateProfileFailure,
} from "./auth.slice";
import { User } from "../../types/auth.types";
import { AppEpic } from "../../store/root.epic";
import { PayloadAction } from "@reduxjs/toolkit";

const loginEpic: AppEpic = (action$: Observable<Action>, _state$, dependencies) =>
  action$.pipe(
    ofType(login.type),
    switchMap(
      (action: Action & { payload: { email: string; password: string } }) =>
        dependencies.authService.login(action.payload).pipe(
          map((response) => {
            dependencies.storageService.setUser(response);
            return loginSuccess(response);
          }),
          catchError((error: Error) => of(loginFailure(error.message))),
        ),
    ),
  );

const logoutEpic: AppEpic = (action$: Observable<Action>, _state$, dependencies) =>
  action$.pipe(
    ofType(logout.type),
    switchMap(() =>
      dependencies.authService.logout().pipe(
        map(() => {
          dependencies.storageService.removeUser();
          return logoutSuccess();
        }),
        catchError((error: Error) => of(logoutFailure(error.message))),
      ),
    ),
  );

const updateProfileEpic: AppEpic = (action$, state$, dependencies) =>
  action$.pipe(
    ofType(updateProfile.type),
    switchMap((action: PayloadAction<Partial<User>>) => {
      const user = state$.value.auth.user;
      if (!user) return of(updateProfileFailure("User is not authenticated"));
      return dependencies.authService.updateProfile(user, action.payload).pipe(
        map((updatedUser) => {
          dependencies.storageService.setUser(updatedUser);
          return updateProfileSuccess(updatedUser);
        }),
        catchError((error: Error) => of(updateProfileFailure(error.message))),
      );
    }),
  );

export const authEpics: AppEpic[] = [loginEpic, logoutEpic, updateProfileEpic];
