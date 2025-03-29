import { createTask, updateTask, deleteTask } from '../../api/userApi';

export const createTaskSlice = (set, get) => ({
  /**
   * Updates a task with new information
   * @param {Object} updatedTask - The updated task data
   * @param {string} projectId - ID of the project containing the task
   */
  updateTask: async (updatedTask, projectId) => {
    const originalState = {
      projects: get().projects,
      currentProject: get().currentProject,
    };

    // Optimistic update
    set((state) => {
      if (projectId === state.currentProject?._id) {
        return {
          currentProject: {
            ...state.currentProject,
            tasks: state.currentProject.tasks.map((task) =>
              task._id === updatedTask._id ? { ...task, ...updatedTask } : task,
            ),
          },
        };
      }
      return {};
    });

    try {
      const { updatedTask: serverUpdatedTask } = await updateTask(
        updatedTask,
        projectId,
      );

      // Update projects list with the response from server
      set((state) => ({
        projects: state.projects.map((project) =>
          project._id === projectId
            ? {
                ...project,
                tasks: project.tasks.map((task) =>
                  task._id === updatedTask._id
                    ? { ...task, ...serverUpdatedTask }
                    : task,
                ),
              }
            : project,
        ),
      }));

      return { success: true };
    } catch (error) {
      console.error('Error updating task:', error);
      // Rollback on error
      set(originalState);
      set({ error: 'Failed to update task' });
      return { success: false, error };
    }
  },

  /**
   * Creates a new task
   * @param {Object} newTask - The new task to create
   * @param {string} projectId - ID of the project to add the task to
   */
  createTask: async (newTask, projectId) => {
    const originalState = {
      projects: get().projects,
      currentProject: get().currentProject,
    };

    // Optimistic update
    set((state) => ({
      currentProject: {
        ...state.currentProject,
        tasks: [...state.currentProject.tasks, newTask],
      },
    }));

    try {
      const data = await createTask(newTask, projectId);
      set({ projects: data.tasksFullList.projects });
      return { success: true };
    } catch (error) {
      console.error('Error creating task:', error);
      // Rollback on error
      set(originalState);
      set({ error: 'Failed to create task' });
      return { success: false, error };
    }
  },

  /**
   * Deletes a task
   * @param {string} taskId - ID of the task to delete
   * @param {string} projectId - ID of the project containing the task
   */
  deleteTask: async (taskId, projectId) => {
    const originalState = {
      projects: get().projects,
      currentProject: get().currentProject,
    };

    // Optimistic update
    set((state) => {
      if (projectId === state.currentProject?._id) {
        return {
          currentProject: {
            ...state.currentProject,
            tasks: state.currentProject.tasks.filter(
              (task) => task._id !== taskId,
            ),
          },
        };
      }
      return {};
    });

    try {
      await deleteTask(taskId, projectId);

      // Update projects to reflect the change
      set((state) => ({
        projects: state.projects.map((project) =>
          project._id === projectId
            ? {
                ...project,
                tasks: project.tasks.filter((task) => task._id !== taskId),
              }
            : project,
        ),
      }));

      return { success: true };
    } catch (error) {
      console.error('Error deleting task:', error);
      // Rollback on error
      set(originalState);
      set({ error: 'Failed to delete task' });
      return { success: false, error };
    }
  },
});
