import User from '../models/user.model.js';

export const createProject = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(req.user.id);

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
      { _id: req.user.id },
      { $push: { projects: newProject } },
      { new: true, runValidators: true },
    ).select('projects');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({
      message: 'Project created successfully',
      newProject,
      userProjectList: updatedUser,
    });
  } catch (error) {
    console.log('Error creating project: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const user = await User.findOne(
      { _id: req.user.id, 'projects._id': projectId },
      { 'projects.$': 1 }, // This returns only the matched project
    );

    if (!user || !user.projects.length) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({
      message: 'Project retrieved successfully',
      project: user.projects[0],
    });
  } catch (error) {
    console.log('Error retrieving project: ', error.message);
    res.status(400).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'projects._id': projectId },
      {
        $set: {
          'projects.$.projectName': req.body.projectName,
          'projects.$.description': req.body.description,
          'projects.$.tasks': req.body.tasks,
        },
      },
      { new: true },
    ).select('projects');

    if (!user) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json('Project updated successfully');
  } catch (error) {
    console.log('Error updating the project: ', error.message);
    res.status(400).json({ message: error.message });
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
