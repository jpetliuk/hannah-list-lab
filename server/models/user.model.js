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
    Username: { type: String },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    premiumAccount: { type: Boolean, default: false },
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
    },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
