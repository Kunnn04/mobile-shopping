import { User } from "../types/auth.types";

const USER_KEY = "user";

const isUser = (value: unknown): value is User => {
  if (!value || typeof value !== "object") return false;
  const user = value as Partial<User>;
  return (
    typeof user.id === "string" &&
    typeof user.fullName === "string" &&
    typeof user.token === "string"
  );
};

export const storageService = {
  getUser: (): User | null => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      if (isUser(parsed)) return parsed;
      localStorage.removeItem(USER_KEY);
      return null;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  },

  setUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },
};
