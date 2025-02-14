import express from 'express';
import dotenv from 'dotenv';

import helmet from 'helmet';

import session from 'express-session';
import passport from 'passport';

import { dbConfig } from './config/dbConfig.js';

import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

import './config/passport.js';

import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());

app.use(cors());

// Set up session handling
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Ensures cookies can't be accessed via JavaScript
      // secure: true,
      // sameSite: 'Strict',
      maxAge: 60 * 60 * 1000,
    }, // Set to true in production with HTTPS
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Start Server and DB
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  dbConfig();
  console.log('Server is running on port ', PORT);
});
