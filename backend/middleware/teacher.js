const jwt = require('jsonwebtoken');

function checkIfTeacher(req, res, next) {
  // Extract the JWT token from the Authorization header
  const token = req.headers.authorization;

  if (!token) {
    // If the token is missing, return an error response
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    // Verify the JWT token using the secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Extract the isTeacher property from the decoded token
    const isTeacher = decodedToken.isTeacher;

    if (isTeacher) {
      // If the user is a teacher, call the next middleware
      next();
    } else {
      // If the user is not a teacher, return an error response
      return res.status(403).json({ message: 'Access denied: User is not a teacher' });
    }
  } catch (err) {
    // If the token verification fails, return an error response
    return res.status(401).json({ message: 'Invalid authorization token' });
  }
}

module.exports=checkIfTeacher
