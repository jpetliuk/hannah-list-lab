import User from '../models/user.model.js';

// export const getProject = async (req, res) => {
//   const { projectId } = req.params;

//   try {
//     const user = await User.findOne(
//       { _id: req.user.id, 'projects._id': projectId },
//       { 'projects.$': 1 }, // This returns only the matched project
//     );

//     if (!user || !user.projects.length) {
//       return res.status(404).json({ message: 'Project not found' });
//     }

//     res.status(200).json({
//       message: 'Project retrieved successfully',
//       project: user.projects[0],
//     });
//   } catch (error) {
//     console.log('Error retrieving project: ', error.message);
//     res.status(400).json({ message: error.message });
//   }
// };

export const createProject = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(req.user.id);
    console.log(req.user.id);

    if (user.premiumAccount === false && user.projects.length >= 5) {
      return res.status(400).json({
        message:
          'Project limit of 5 projects has been reached on your Free Account.',
      });
    }

    const { projectName } = req.body;

    if (!projectName) {
      return res.status(400).json({ message: 'Project name is required.' });
    }

    const newProject = {
      projectName,
      description: '',
      backgroundImage: '/projectBackgrounds/firewatch-background.jpg',
      iconColor: '#f7653d',
      tasks: [],
    };

    const projectFullList = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { projects: newProject } },
      { new: true, runValidators: true },
    ).select('projects');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({
      message: 'Project created successfully',
      projectFullList,
    });
  } catch (error) {
    console.log('Error creating project: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { updatedProject } = req.body;
  console.log('Updated project:', updatedProject);

  try {
    // Log the authenticated user
    // Ensure the user is authenticated, using Passport's `req.user` to get the authenticated user
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find the project in the user's document by matching the project ID and user ID
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'projects._id': updatedProject._id },
      {
        $set: {
          'projects.$': updatedProject, // Update the matched project
        },
      },
      { new: true }, // This returns the updated user document
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Project not found or user not authorized' });
    }

    // If the project was found and updated, return the updated project
    return res.status(200).json({
      message: 'Project updated successfully',
      project: updatedProject, // Send the updated project back to the client
    });
  } catch (error) {
    console.error('Error updating project: ', error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'projects._id': projectId },
      { $pull: { projects: { _id: projectId } } },
      { new: true },
    ).select('projects');

    if (!user) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json({
      message: 'Project deleted successfully',
      projects: user.projects, // Return updated project list
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  const { newTask, projectId } = req.body;

  try {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Check if the task name and project ID are provided
    if (!newTask || !projectId) {
      return res
        .status(400)
        .json({ message: 'Task and project ID are required' });
    }

    // Find the user's project by projectId and update it with the new task
    const tasksFullList = await User.findOneAndUpdate(
      { _id: req.user.id, 'projects._id': projectId }, // Ensure the user owns the project
      {
        $push: { 'projects.$.tasks': newTask }, // Push the new task into the project's tasks array
      },
      { new: true, runValidators: true }, // Return the updated user document
    );

    // If the project is not found or the user is not authorized, return an error
    if (!tasksFullList) {
      return res
        .status(404)
        .json({ message: 'Project not found or user not authorized' });
    }

    // Return the updated project with the new task
    return res.status(200).json({
      message: 'Task created successfully',
      tasksFullList, // Find and return the updated project
    });
  } catch (error) {
    console.error('Error creating task: ', error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updateProjectTask = async (req, res) => {
  const { updatedTask, projectId } = req.body;

  try {
    // Log the authenticated user
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find the project and update the task inside the project's tasks array
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'projects._id': projectId },
      {
        $set: {
          // Use positional operator to match the task by its _id inside the tasks array
          'projects.$.tasks.$[taskElem]': updatedTask,
        },
      },
      {
        new: true, // Return the updated user document
        arrayFilters: [{ 'taskElem._id': updatedTask._id }], // Filter the tasks by their _id
      },
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Project or task not found, or user not authorized' });
    }

    // If the task was found and updated, return the updated task
    return res.status(200).json({
      message: 'Task updated successfully',
      updatedTask, // Send the updated task back to the client
    });
  } catch (error) {
    console.error('Error updating task: ', error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { projectId, taskId } = req.params;

  console.log('Project ID:', projectId);
  console.log('Task ID:', taskId);

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'projects._id': projectId },
      {
        $pull: {
          'projects.$.tasks': { _id: taskId }, // Remove the task with the matching taskId
        },
      },
      { new: true }, // Return the updated user document
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Project not found or user not authorized' });
    }

    // If the task was successfully removed, return the updated project
    return res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    return res.status(500).json({ message: error.message });
  }
};
