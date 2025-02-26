import { create } from 'zustand';
import axios from 'axios';

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
      const response = await axios.get('http://localhost:4000/api/user', {
        withCredentials: true,
      });
      const data = response.data;

      console.log(data);

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

  updateProjects: (newProjects) => set({ projects: newProjects }),
  updateStickyNotes: (newStickyNotes) => set({ stickyNotes: newStickyNotes }),
}));

export default useUserStore;
