import express from 'express';

import { signup, login } from '../controllers/authController.js';
import {
  updateProject,
  getProject,
  deleteProject,
  createProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.post('/signup', signup);
router.get('/login', login);

router.post('/project/', createProject);
router.get('/project/:projectId', getProject);
router.put('/project/:projectId', updateProject);
router.delete('/project/:projectId', deleteProject);

export default router;
