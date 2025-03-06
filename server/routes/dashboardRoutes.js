import express from 'express';

import { isAuthenticated } from '../middleware/authMiddleware.js';

import {
  createProject,
  updateProject,
  deleteProject,
  // getProject,
  createTask,
  updateProjectTask,
  deleteTask,
} from '../controllers/projectController.js';

import {
  upsertStickyNote,
  deleteStickyNote,
} from '../controllers/stickyNotesController.js';

const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
  res.json(req.user);
});

//sticky notes
router.put('/sticky-notes/', isAuthenticated, upsertStickyNote);
router.delete('/sticky-notes/', isAuthenticated, deleteStickyNote);

//projects
router.post('/project/create', isAuthenticated, createProject);
router.put('/project/update', isAuthenticated, updateProject);
router.delete('/project/:projectId', isAuthenticated, deleteProject);
// router.get('/project/:projectId', isAuthenticated, getProject);

router.post('/project/create-task', isAuthenticated, createTask);
router.put('/project/update-task', isAuthenticated, updateProjectTask);
router.delete('/project/:projectId/:taskId', isAuthenticated, deleteTask);

export default router;
