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
          _id: data._id,
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

  createNewProject: async (projectName) => {
    try {
      const response = await axios.post(
        `${API_URL}/project/create`,
        { projectName },
        { withCredentials: true },
      );

      const data = response.data;
      console.log(data);

      set({
        projects: data.projectFullList.projects,
      });
    } catch (error) {
      console.error('Error creating project:', error);
    }
  },

  deleteProject: async (projectId) => {
    try {
      const response = await axios.delete(`${API_URL}/project/${projectId}`, {
        withCredentials: true,
      });

      set((state) => ({
        projects: state.projects.filter((project) => project._id !== projectId),
      }));

      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  },

  // save project with updated data to the server and update the state with the updated project
  saveProject: async (updatedProject) => {
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
          },
        };
      }
    });

    try {
      const response = await axios.put(
        `${API_URL}/project/update`,
        { updatedProject },
        { withCredentials: true },
      );

      const data = response.data;

      // if the update was successful, update the project in the store to be on sync with the server
      set((state) => ({
        projects: state.projects.map((project) =>
          updatedProject._id === project._id
            ? {
                ...project,
                projectName: updatedProject.projectName,
                description: updatedProject.description,
                backgroundImage: updatedProject.backgroundImage,
                iconColor: updatedProject.iconColor,
              }
            : project,
        ),
      }));

      console.log(data);
    } catch (error) {
      // Roll back to the previous state if the update fails
      set((state) => {
        const restoredCurrentProject = state.projects.find(
          (project) => project._id === state.currentProject._id,
        );

        return restoredCurrentProject
          ? { currentProject: restoredCurrentProject }
          : console.error('Error restoring project');
      });

      console.error('Error updating project:', error);
    }
  },

  updateTask: async (updatedTask, projectId) => {
    set((state) => {
      if (projectId === state.currentProject._id) {
        return {
          currentProject: {
            ...state.currentProject,
            tasks: state.currentProject.tasks.map(
              (task) =>
                // If task._id matches the updated task._id, update the task
                task._id === updatedTask._id
                  ? { ...task, ...updatedTask }
                  : task, // Keep the other tasks unchanged
            ),
          },
        };
      }
    });

    try {
      // Send the updated task to the server to update it in the database
      const response = await axios.put(
        `${API_URL}/project/update-task`, // Assuming your route is set up for this
        { updatedTask, projectId },
        { withCredentials: true }, // Ensure the session/cookie is included
      );

      const { updatedTask: updatedTaskResponse } = response.data; // Extract the updated task from the response

      console.log();

      // Update the local state with the updated task data
      set((state) => {
        // Update the specific project with the updated task
        return {
          projects: state.projects.map((project) =>
            project._id === projectId
              ? {
                  ...project,
                  tasks: project.tasks.map((task) =>
                    task._id === updatedTask._id
                      ? { ...task, ...updatedTaskResponse } // Update the task
                      : task,
                  ),
                }
              : project,
          ),
        };
      });

      console.log('Task updated successfully:', updatedTaskResponse);
    } catch (error) {
      console.error('Error updating task:', error);
      // Optionally, you could handle any error responses here and provide feedback to the user
    }
  },

  createTask: async (newTask, projectId) => {
    set((state) => {
      return {
        currentProject: {
          ...state.currentProject,
          tasks: [...state.currentProject.tasks, newTask],
        },
      };
    });
    try {
      // Send a request to the backend to create a new task
      const response = await axios.post(
        `${API_URL}/project/create-task`, // Replace with the actual URL to your backend route
        { newTask, projectId },
        { withCredentials: true }, // Ensure the session is sent along with the request
      );

      const data = response.data;
      console.log(data);

      set({ project: data.tasksFullList.projects });

      console.log('Task created successfully:', response.data.message);
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  },

  deleteTask: async (taskId, projectId) => {
    set((state) => {
      if (projectId === state.currentProject._id) {
        return {
          currentProject: {
            ...state.currentProject,
            tasks: state.currentProject.tasks.filter(
              (task) => task._id !== taskId, // Remove the task with the matching _id
            ),
          },
        };
      }
    });

    try {
      const response = await axios.delete(
        `${API_URL}/project/${projectId}/${taskId}`,
        { withCredentials: true }, // Include credentials for authentication
      );

      const data = response.data;
      console.log(data);

      // Update the state locally if needed
      set((state) => ({
        projects: state.projects.map((project) =>
          state.currentProject._id === project._id
            ? {
                ...project,
                tasks: state.currentProject.tasks,
              }
            : project,
        ),
      }));
    } catch (error) {
      set((state) => {
        const restoredCurrentProject = state.projects.find(
          (project) => project._id === state.currentProject._id,
        );

        return restoredCurrentProject
          ? { currentProject: restoredCurrentProject }
          : console.error('Error restoring project');
      });
      console.error('Error deleting task:', error);
    }
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

  // Upsert (create or update) a sticky note and update state
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
