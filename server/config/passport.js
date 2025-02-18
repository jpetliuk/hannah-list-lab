import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../models/user.model.js';
import { defaultProject } from '../utils/defaultData.js';

import dotenv from 'dotenv';

dotenv.config();

// Serialize user (storing user info in session)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user (retrieving user from session)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select(
      '-oauthId -oauthProvider -lastLogin -updatedAt -email -__v',
    );
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/auth/google/callback', // Adjust URL for production
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user exists, if not create a new one
        let user = await User.findOne({
          oauthId: profile.id,
          oauthProvider: 'google',
        });
        if (user) {
          user.lastLogin = new Date();
          await user.save();
        }
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePicture: profile.photos[0].value,
            oauthProvider: 'google',
            oauthId: profile.id,
            projects: defaultProject,
          });
          await user.save();
        }
        done(null, user); // User is authenticated
      } catch (err) {
        done(err, null);
      }
    },
  ),
);

export default passport;
