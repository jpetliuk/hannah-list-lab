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
  currentProject: false,

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
        user: {
          name: data.name,
          username: data.username,
          email: data.email,
          profilePicture: data.profilePicture,
          premiumAccount: data.premiumAccount,
          description: 'this is my description',
        },
        projects: data.projects,
        stickyNotes: data.stickyNotes,
      });

      set({ isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error('Error fetching user data:', error);
      set({ isAuthenticated: false, isLoading: false });
    }
  },

  setCurrentProject: (project) => {
    if (!project._id) return set({ currentProject: false });

    set({
      currentProject: project,
    });
  },

  saveProjectSettings: ({
    _id,
    projectName,
    description,
    backgroundImage,
    iconColor,
  }) => {
    set((state) => {
      if (_id === state.currentProject._id) {
        return {
          currentProject: {
            ...state.currentProject,
            projectName: projectName ?? state.currentProject.projectName,
            description: description ?? state.currentProject.description,
            backgroundImage:
              backgroundImage ?? state.currentProject.backgroundImage,
            iconColor: iconColor ?? state.currentProject.iconColor,
          },
        };
      }
    });

    set((state) => ({
      projects: state.projects.map((project) =>
        project._id === _id
          ? {
              ...project,
              projectName: projectName,
              description: description,
              backgroundImage: backgroundImage,
              iconColor: iconColor,
            }
          : project,
      ),
    }));
  },

  logout: async () => {
    set({ isAuthenticated: false, isLoading: true });
    try {
      const response = await axios.post(
        'http://localhost:4000/auth/logout',
        {},
        {
          withCredentials: true,
        },
      );
      const data = response.data;
      console.log(data);
      set({ isAuthenticated: false, isLoading: false });
    } catch (error) {
      console.error('Error logging out:', error);
      set({ isAuthenticated: true, isLoading: false });
    }
  },

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

  // Modal Setting
  changeNameAndDescription: (newName, newDescription) => {
    set((state) => ({
      user: {
        ...state.user,
        ...(newName !== false && { name: newName }),
        ...(newDescription !== false && { description: newDescription }),
      },
    }));
  },
}));

export default useUserStore;
