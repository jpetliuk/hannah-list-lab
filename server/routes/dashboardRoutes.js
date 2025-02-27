import express from 'express';

import { isAuthenticated } from '../middleware/authMiddleware.js';

import {
  updateProject,
  getProject,
  deleteProject,
  createProject,
} from '../controllers/projectController.js';

import {
  createStickyNote,
  updateStickyNote,
  deleteStickyNote,
} from '../controllers/stickyNotesController.js';

const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
  res.json(req.user);
});

//sticky notes
router.post('/sticky-note/', isAuthenticated, createStickyNote);
router.patch('/sticky-note/', isAuthenticated, updateStickyNote);
router.delete('/sticky-note/', isAuthenticated, deleteStickyNote);

//projects
router.post('/project/', isAuthenticated, createProject);
router.get('/project/:projectId', isAuthenticated, getProject);
router.put('/project/:projectId', isAuthenticated, updateProject);
router.delete('/project/:projectId', isAuthenticated, deleteProject);

export default router;
