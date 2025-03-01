import { create } from 'zustand';

const useAppStates = create((set) => ({
  modal: false,

  handleModal: () => {
    set((state) => ({ modal: !state.modal }));
  },
}));

export default useAppStates;
