import { create } from 'zustand';
import axios from 'axios';

const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:4000/api/user'
    : '/api/user';

const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  projects: [],

  stickyNotes: [],

  error: null,

  fetchUserData: async () => {
    set({ isAuthenticated: false, isLoading: true });
    try {
      const response = await axios.get(API_URL, {
        withCredentials: true,
      });
      const data = response.data;

      set({
        isAuthenticated: true,
        isLoading: false,
        user: {
          name: data.name,
          username: data.username,
          email: data.email,
          profilePicture: data.profilePicture,
          premiumAccount: data.premiumAccount,
        },
        projects: data.projects,
        stickyNotes: data.stickyNotes,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      set({ isAuthenticated: false, isLoading: false });
    }
  },

  updateStickyNotes: (newStickyNotes) => set({ stickyNotes: newStickyNotes }),

  upsertStickyNote: async ({
    stickyNoteTitle,
    stickyNoteText,
    stickyNoteColor,
    _id,
  }) => {
    try {
      const response = await axios.put(
        `${API_URL}/sticky-notes`,
        { stickyNoteTitle, stickyNoteText, stickyNoteColor, _id },
        { withCredentials: true },
      );

      const data = response.data;

      set({ stickyNotes: data.updatedStickyNotes.stickyNotes });
    } catch (error) {
      console.error('Error upserting sticky note:', error);
    }
  },

  deleteStickyNote: async (_id) => {
    try {
      const response = await axios.delete(`${API_URL}/sticky-notes`, {
        data: { _id },
        withCredentials: true,
      });

      const data = response.data;

      set({ stickyNotes: data.updatedStickyNotes });
    } catch (error) {
      console.error('Error deleting sticky note:', error);
    }
  },
}));

export default useUserStore;
