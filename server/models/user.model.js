import mongoose from 'mongoose';

// Embedded Schemas
const taskSchema = mongoose.Schema({
  taskName: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const itemSchema = mongoose.Schema({
  itemName: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  tasks: {
    type: [taskSchema],
  },
});

const projectSchema = mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String },
  backgroundImage: { type: String },
  iconColor: { type: String },
  items: [itemSchema],
});

const stickyNotesSchema = mongoose.Schema({
  stickyNoteTitle: { type: String },
  stickyNoteText: { type: String },
  stickyNoteColor: { type: String, required: true },
  _id: { type: String },
});

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    premiumAccount: { type: Boolean, default: false },
    profilePicture: { type: String },
    username: { type: String },
    oauthProvider: {
      type: String,
      enum: ['google'],
      required: true,
    },
    oauthId: { type: String, required: true },
    projects: {
      type: [projectSchema],
    },
    stickyNotes: [stickyNotesSchema],
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
