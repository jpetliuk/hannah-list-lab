import { createProject, updateProject, deleteProject } from '../../api/userApi';

export const createProjectSlice = (set, get) => ({
  projects: [],
  currentProject: false,

  /**
   * Sets the current active project
   * @param {Object} project - The project to set as current
   */
  setCurrentProject: (project) => {
    if (!project._id) return set({ currentProject: false });
    set({ currentProject: project });
  },

  /**
   * Creates a new project
   * @param {string} projectName - Name of the new project
   */
  createNewProject: async (projectName) => {
    try {
      const data = await createProject(projectName);
      set({ projects: data.projectFullList.projects });
      return { success: true };
    } catch (error) {
      console.error('Error creating project:', error);
      set({ error: 'Failed to create project' });
      return { success: false, error };
    }
  },

  /**
   * Deletes a project
   * @param {string} projectId - ID of the project to delete
   */
  deleteProject: async (projectId) => {
    try {
      await deleteProject(projectId);

      set((state) => ({
        projects: state.projects.filter((project) => project._id !== projectId),
        currentProject:
          state.currentProject && state.currentProject._id === projectId
            ? false
            : state.currentProject,
      }));

      return { success: true };
    } catch (error) {
      console.error('Error deleting project:', error);
      set({ error: 'Failed to delete project' });
      return { success: false, error };
    }
  },

  /**
   * Updates a project with new information
   * @param {Object} updatedProject - Updated project data
   */
  saveProject: async (updatedProject) => {
    const originalProjects = get().projects;
    const originalCurrentProject = get().currentProject;

    // Optimistic update
    set((state) => {
      // Update current project if it's the one being modified
      const newCurrentProject =
        state.currentProject && state.currentProject._id === updatedProject._id
          ? {
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
            }
          : state.currentProject;

      // Update projects list
      const newProjects = state.projects.map((project) =>
        project._id === updatedProject._id
          ? {
              ...project,
              projectName: updatedProject.projectName ?? project.projectName,
              description: updatedProject.description ?? project.description,
              backgroundImage:
                updatedProject.backgroundImage ?? project.backgroundImage,
              iconColor: updatedProject.iconColor ?? project.iconColor,
            }
          : project,
      );

      return {
        currentProject: newCurrentProject,
        projects: newProjects,
      };
    });

    try {
      await updateProject(updatedProject);
      return { success: true };
    } catch (error) {
      console.error('Error updating project:', error);
      // Rollback on error
      set({
        projects: originalProjects,
        currentProject: originalCurrentProject,
        error: 'Failed to update project',
      });
      return { success: false, error };
    }
  },
});
