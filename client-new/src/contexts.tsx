import { createContext } from "react";

export type User = {
  userName: string;
  avatarUrl: string;
};

type UserContextType = {
  user: User | undefined;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
});
