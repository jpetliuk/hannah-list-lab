import express from 'express';

import { isAuthenticated } from '../middleware/authMiddleware.js';

import {
  updateProject,
  getProject,
  deleteProject,
  createProject,
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
router.post('/project/', isAuthenticated, createProject);
router.get('/project/:projectId', isAuthenticated, getProject);
router.put('/project/update', isAuthenticated, updateProject);
router.delete('/project/:projectId', isAuthenticated, deleteProject);

export default router;
