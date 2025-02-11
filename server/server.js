import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { db } from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  db();
  console.log('Server is running on port ', PORT);
});
