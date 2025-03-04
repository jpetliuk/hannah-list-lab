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

  saveProject: (updatedProject) => {
    console.log(updatedProject);
    // validate updated project
    // if valid update current project
    set((state) => {
      if (updatedProject._id === state.currentProject._id) {
        return {
          currentProject: {
            ...state.currentProject,
            projectName:
              updatedProject.projectName ?? state.currentProject.projectName,
            description:
              updatedProject.description ?? state.currentProject.description,
            backgroundImage:
              updatedProject.backgroundImage ??
              state.currentProject.backgroundImage,
            iconColor:
              updatedProject.iconColor ?? state.currentProject.iconColor,
            tasks: updatedProject.tasks ?? state.currentProject.tasks,
          },
        };
      }
    });

    // send current project to server
    // server looks for project with id and updates it
    // await for response from server if successful update projects
    set((state) => ({
      projects: state.projects.map((project) =>
        updatedProject._id === project._id
          ? {
              ...project,
              projectName: updatedProject.projectName,
              description: updatedProject.description,
              backgroundImage: updatedProject.backgroundImage,
              iconColor: updatedProject.iconColor,
              tasks: updatedProject.tasks ?? state.currentProject.tasks,
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
