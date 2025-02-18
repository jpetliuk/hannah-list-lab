import mongoose from 'mongoose';

// Embedded Schemas
const taskSchema = mongoose.Schema({
  taskName: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const projectSchema = mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String },
  tasks: {
    type: [taskSchema],
  },
});

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    premiumAccount: { type: Boolean, default: false },
    oauthProvider: {
      type: String,
      enum: ['google'],
      required: true,
    },
    oauthId: { type: String, required: true },
    projects: {
      type: [projectSchema],
    },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
