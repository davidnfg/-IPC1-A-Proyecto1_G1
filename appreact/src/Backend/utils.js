const jwt = require('jsonwebtoken');

const validateUser = (user) => {
  // Puedes agregar más validaciones según tus necesidades
  return user.firstName && user.lastName && user.email && user.password && user.gender && user.birthDate;
};

const generateToken = (user) => {
  const payload = { id: user.email };
  return jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
};

module.exports = { validateUser, generateToken };
