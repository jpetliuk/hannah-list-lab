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
    res.redirect('/api/user');
  },
);

// Logout route
router.post('/logout', (req, res) => {
  if (!req.session) {
    return res.status(400).json({ message: 'No active session found' });
  }

  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Could not destroy session' });
      }
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
  });
});

export default router;
