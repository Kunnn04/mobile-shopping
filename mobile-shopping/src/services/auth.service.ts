import { Observable, throwError } from "rxjs";
import { mockApiCall } from "./utils";
import { MOCK_USER } from "../mocks/mockData";
import { USER_ACCOUNT } from "../data";
import { User } from "../types/auth.types";

interface Credentials {
  email: string;
  password: string;
}

interface LogoutResponse {
  success: boolean;
}

export const authService = {
  login: (credentials: Credentials): Observable<User> => {
    console.log(`[AUTH] Giả lập đăng nhập: ${credentials.email}`);

    if (
      credentials.email === USER_ACCOUNT.email &&
      credentials.password === USER_ACCOUNT.password
    ) {
      return mockApiCall(MOCK_USER);
    }

    return throwError(() => new Error("Email hoặc mật khẩu không đúng"));
  },

  logout: (): Observable<LogoutResponse> => {
    console.log("[AUTH] Giả lập đăng xuất");
    return mockApiCall({ success: true });
  },

  updateProfile: (user: User, changes: Partial<User>): Observable<User> =>
    mockApiCall({ ...user, ...changes }),
};
