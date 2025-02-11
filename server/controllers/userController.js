import User from '../models/user.model.js';
import { defaultProject, devMockUser } from '../utils/defaultData.js';

// Change signup code to work with OAuth2.0 in the future!
export const signup = async (req, res) => {
  try {
    // Create new user with default project
    const user = new User(...devMockUser);

    user.projects = [...defaultProject];

    await user.save();
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
