import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  user: any;
}

interface Actions {
  setUser: (user: any) => void;
}

const authStore = create(
  persist<State & Actions>(
    (set) => ({
      user: null,
      setUser: (user: any) =>
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
