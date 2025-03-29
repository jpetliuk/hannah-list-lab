import { fetchUser, logoutUser } from '../../api/userApi';

export const createUserSlice = (set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  /**
   * Fetches user data from the server
   */
  fetchUserData: async () => {
    set({ isAuthenticated: false, isLoading: true, error: null });
    try {
      const data = await fetchUser();

      set({
        user: {
          _id: data._id,
          name: data.name,
          username: data.username,
          email: data.email,
          profilePicture: data.profilePicture,
          premiumAccount: data.premiumAccount,
          description: data.description || 'this is my description',
        },
        projects: data.projects,
        stickyNotes: data.stickyNotes,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      set({
        isAuthenticated: false,
        isLoading: false,
        error: 'Failed to fetch user data',
      });
    }
  },

  /**
   * Logs out the current user
   */
  logout: async () => {
    set({ isAuthenticated: false, isLoading: true });
    try {
      await logoutUser();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        projects: [],
        currentProject: false,
        stickyNotes: [],
      });
    } catch (error) {
      console.error('Error logging out:', error);
      set({
        isAuthenticated: true,
        isLoading: false,
        error: 'Failed to log out',
      });
    }
  },

  /**
   * Updates user profile information
   * @param {string|boolean} newName - New name or false to not update
   * @param {string|boolean} newDescription - New description or false to not update
   */
  changeNameAndDescription: (newName, newDescription) => {
    set((state) => ({
      user: {
        ...state.user,
        ...(newName !== false && { name: newName }),
        ...(newDescription !== false && { description: newDescription }),
      },
    }));
  },
});
