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
} from "./auth.slice";
import { authService } from "../../services/auth.service";
import { AppEpic } from "../../store/root.epic";

const loginEpic: AppEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(login.type),
    switchMap(
      (action: Action & { payload: { email: string; password: string } }) =>
        authService.login(action.payload).pipe(
          map((response) => loginSuccess(response)),
          catchError((error: Error) => of(loginFailure(error.message))),
        ),
    ),
  );

const logoutEpic: AppEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(logout.type),
    switchMap(() =>
      authService.logout().pipe(
        map(() => logoutSuccess()),
        catchError((error: Error) => of(loginFailure(error.message))),
      ),
    ),
  );

export const authEpics: AppEpic[] = [loginEpic, logoutEpic];
