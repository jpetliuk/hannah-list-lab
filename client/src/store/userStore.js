import { create } from 'zustand';
import { createUserSlice } from './slices/userSlice';
import { createProjectSlice } from './slices/projectSlice';
import { createTaskSlice } from './slices/taskSlice';
import { createStickyNoteSlice } from './slices/stickyNoteSlice';

const useUserStore = create((set, get) => ({
  ...createUserSlice(set, get),
  ...createProjectSlice(set, get),
  ...createTaskSlice(set, get),
  ...createStickyNoteSlice(set, get),
}));

export default useUserStore;
