const jwt = require('jsonwebtoken');

const jwtAuthMiddleWare = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token not found' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please login again' });
    }
    return res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};


//function to generate token

const generateToken = (userData) => {

    //generate a new jwt token using user data

    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:"1h"}) //30sec
}
module.exports = {jwtAuthMiddleWare, generateToken};