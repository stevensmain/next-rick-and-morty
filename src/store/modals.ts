import { Modal } from "@/types/modals";
import { create } from "zustand";

interface State {
  show: Modal;
}

interface Actions {
  showModal: (modal: Modal) => void;
  closeModal: () => void;
}

const modalsStore = create<State & Actions>((set) => ({
  show: Modal.NONE,
  showModal: (modalToShow: Modal) =>
    set(() => ({
      show: modalToShow,
    })),
  closeModal: () =>
    set(() => ({
      show: Modal.NONE,
    })),
}));

export default modalsStore;
