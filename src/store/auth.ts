import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  password: string;
}

interface State {
  user: User | null;
}

interface Actions {
  setUser: (user: User) => void;
}

const authStore = create(
  persist<State & Actions>(
    (set) => ({
      user: null,
      setUser: (user: User) =>
        set(() => ({
          user,
        })),
    }),
    {
      name: "auth",
    }
  )
);

export default authStore;
