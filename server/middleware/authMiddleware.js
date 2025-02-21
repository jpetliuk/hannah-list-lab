export const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user) {
    return res
      .status(401)
      .json({ message: 'Session expired. Please log in again.' });
  }
  next();
};
