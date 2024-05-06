require('dotenv').config()

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };

module.exports = {
    authMiddleware
}