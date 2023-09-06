import { create } from "zustand";

interface State {
  show: boolean;
}

interface Actions {
  toggle: () => void;
}

const menuStore = create<State & Actions>((set) => ({
  show: false,
  toggle: () =>
    set((state) => ({
      show: !state.show,
    })),
}));

export default menuStore;
