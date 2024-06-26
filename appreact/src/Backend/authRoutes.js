const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validateUser, generateToken } = require('./utils');

const router = express.Router();
const usersFilePath = path.join(__dirname, 'users.json');

// Leer usuarios del archivo JSON
const readUsersFromFile = () => {
  if (fs.existsSync(usersFilePath)) {
    const usersData = fs.readFileSync(usersFilePath);
    return JSON.parse(usersData);
  }
  return [];
};

// Escribir usuarios al archivo JSON
const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Registro
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, gender, birthDate } = req.body;
  const users = readUsersFromFile();

  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'Usuario ya registrado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { firstName, lastName, email, password: hashedPassword, gender, birthDate };
  users.push(newUser);
  writeUsersToFile(users);

  const token = generateToken(newUser);
  res.status(201).json({ message: 'Usuario registrado exitosamente', token });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users = readUsersFromFile();

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }

  const token = generateToken(user);
  res.json({ message: 'Inicio de sesión exitoso', token });
});

module.exports = router;
