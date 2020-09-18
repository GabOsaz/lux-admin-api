const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createToken = user => {
  // Sign the JWT
  return jwt.sign(
    {
      sub: user._id,
      iss: 'api.lux',
      aud: 'api.lux'
    },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '1h' }
  );
};

const hashPassword = password => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const verifyPassword = (
  passwordAttempt,
  hashedPassword
) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

const attachUser = (req, res, next) => {
    const token = req.cookies.token
    if(!token) {
      return res.status(401).json({message: 'Authentication invalid'})
    }
    try {
        const verifyJwt = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken;
        next();
    } catch(err) {
        res.status(400).json({msg: 'Token invalid'})
    }
};

const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'There was a problem authorizing the request'
    });
  }
  if (req.user.role !== 'admin') {
    return res
      .status(401)
      .json({ message: 'Insufficient role' });
  }
  next();
};

module.exports = {
  createToken,
  hashPassword,
  verifyPassword,
  attachUser
};
