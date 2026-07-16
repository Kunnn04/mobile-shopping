import reducer, {
  loginSuccess,
  logout,
  logoutFailure,
} from "./auth.slice";

const user = { id: "u1", fullName: "User", token: "token" };

test("keeps the authenticated session when remote logout fails", () => {
  let state = reducer(undefined, loginSuccess(user));
  state = reducer(state, logout());
  state = reducer(state, logoutFailure("network"));

  expect(state.isLoggedIn).toBe(true);
  expect(state.user).toEqual(user);
  expect(state.error).toBe("network");
});
