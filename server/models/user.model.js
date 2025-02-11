import mongoose from 'mongoose';

// Validation functions for limits
const tasksLimit = 10;
const projectsLimit = 5;

function validateTasks(val) {
  val.length <= tasksLimit;
}

const validateProjects = (val) => {
  return val.length <= projectsLimit;
};

// Embedded Schemas
const taskSchema = mongoose.Schema({
  taskName: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const projectSchema = mongoose.Schema(
  {
    projectName: { type: String, required: true },
    description: { type: String },
    tasks: {
      type: [taskSchema],
      validate: {
        validator: validateTasks,
        message: `The limit of ${tasksLimit} tasks has been reached`,
      },
    },
  },
  { timestamps: true },
);

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    Username: { type: String },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    oauthProvider: {
      type: String,
      enum: ['google', 'facebook', 'github', 'twitter'],
      required: true,
    },
    oauthId: { type: String, required: true },
    accessToken: { type: String },
    verificationToken: { type: String },
    projects: {
      type: [projectSchema],
      validate: {
        validator: validateProjects,
        message: `The limit of ${projectsLimit} projects has been reached`,
      },
    },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
