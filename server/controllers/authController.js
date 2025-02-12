import User from '../models/user.model.js';
import { defaultProject, devMockUser } from '../utils/defaultData.js';

// Change signup code to work with OAuth2.0 in the future!
export const signup = async (req, res) => {
  try {
    // Create new user with default project
    const user = new User(...devMockUser);

    user.projects = [...defaultProject];

    await user.save();
    res.status(200).json({
      message: 'User Created successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    user.lastLogin = Date.now();

    await user.save();

    res.status(200).json({
      message: 'Logged in successfully',
      projectCount: user.projects.length,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log('Error logging in: ', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
