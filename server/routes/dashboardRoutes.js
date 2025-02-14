import express from 'express';

import { isAuthenticated } from '../middleware/authMiddleware.js';

import {
  updateProject,
  getProject,
  deleteProject,
  createProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
  res.json({ message: 'Welcome to your dashboard', user: req.user });
});

router.post('/project/', isAuthenticated, createProject);
router.get('/project/:projectId', isAuthenticated, getProject);
router.put('/project/:projectId', isAuthenticated, updateProject);
router.delete('/project/:projectId', isAuthenticated, deleteProject);

export default router;
