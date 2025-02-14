import express from 'express';
import passport from '../config/passport.js';

const router = express.Router();

// Google authentication route
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

// Google OAuth callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful, redirect to home
    res.redirect('/dashboard');
  },
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    res.redirect('/');
  });
});

export default router;
