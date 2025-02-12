import User from '../models/user.model.js';
import { verifyUser } from '../middleware/verifyUser.js';

export const getProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const user = await User.findOne(
      { _id: verifyUser, 'projects._id': projectId },
      { 'projects.$': 1 }, // This returns only the matched project
    );

    if (!user || !user.projects.length) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Project retrieved successfully',
      project: user.projects[0],
    });
  } catch (error) {
    console.log('Error retrieving project: ', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const updatedProject = await User.findOneAndUpdate(
      { _id: verifyUser, 'projects._id': projectId },
      {
        $set: {
          'projects.$.projectName': req.body.projectName,
          'projects.$.description': req.body.description,
          'projects.$.tasks': req.body.tasks,
        },
      },
      { new: true },
    ).select('projects');

    if (!updatedProject)
      return res.status(404).json({ message: 'Project not found' });

    res.status(200).json('Project updated successfully');
  } catch (error) {
    console.log('Error updating the project: ', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const updatedUser = await User.findOneAndUpdate(
      { _id: verifyUser },
      { $pull: { projects: { _id: projectId } } },
      { new: true },
    ).select('projects');

    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' });

    // If no project was found or removed
    const projectDeleted = updatedUser.projects.find((project) => {
      return project._id.toString() === projectId;
    });

    if (projectDeleted)
      return res.status(404).json({ message: 'Project not found' });

    res
      .status(200)
      .json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project: ', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const user = await User.findById(verifyUser);

    if (user.premiumAccount === false && user.projects.length >= 5) {
      return res.status(400).json({
        message:
          'Project limit of 5 projects has been reached on your Free Account.',
      });
    }

    const { projectName, description } = req.body;

    if (!projectName || !description) {
      return res
        .status(400)
        .json({ message: 'Project name and description are required.' });
    }

    const newProject = {
      projectName,
      description,
      tasks: [],
    };

    const updatedUser = await User.findOneAndUpdate(
      { _id: verifyUser },
      { $push: { projects: newProject } },
      { new: true, runValidators: true },
    ).select('projects');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project: newProject,
      user: updatedUser,
    });
  } catch (error) {
    console.log('Error creating project: ', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
