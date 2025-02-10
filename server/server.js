import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { db } from './config/db.js';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/api/test', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  db();
  console.log('Server is running on port ', PORT);
});
