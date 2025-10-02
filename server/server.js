import express from 'express';
import dotenv from 'dotenv';

import helmet from 'helmet';

import session from 'express-session';
import passport from 'passport';

import MongoStore from 'connect-mongo';

import { dbConfig } from './config/dbConfig.js';

import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

import './config/passport.js';

import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());
app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: process.env.CLIENT_URL,
  }),
);

// Database Connection
dbConfig();

// Session config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS required
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
      ttl: 1000 * 60 * 60 * 24,
      autoRemoveInterval: 60,
      autoRemove: 'interval',
    }),
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api/user', dashboardRoutes);

// Start Server and DB
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});
