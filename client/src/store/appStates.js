import { create } from 'zustand';

const useAppStates = create((set) => ({
  modalUserSettings: false,

  handleModalUserSettings: () => {
    set((state) => ({ modalUserSettings: !state.modalUserSettings }));
  },


}));

export default useAppStates;
