// Dependencias
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

// Backend
const app = express();
// Puerto
const PORT = 5000;
// Archivos
const FilenameUsers = "Usuarios.json";
const FilenameMovies = "Movies.json";

// Especificar al framework
app.use(bodyParser.json());
app.use(cors());

// Simulacion base de datos
let dataUsers = [];
let dataMovies = [];

// Permanecer datos
// Usuarios
if (!fs.existsSync(FilenameUsers)) {
  fs.writeFileSync(FilenameUsers, JSON.stringify(dataUsers));
} else {
  try {
    const fileData = fs.readFileSync(FilenameUsers, "utf-8");
    if (fileData) {
      dataUsers = JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error parsing JSON file:", err);
    dataUsers = [];
  }
}

// Peliculas
if (!fs.existsSync(FilenameMovies)) {
  fs.writeFileSync(FilenameMovies, JSON.stringify(dataMovies));
} else {
  try {
    const fileData = fs.readFileSync(FilenameMovies, "utf-8");
    if (fileData) {
      dataMovies = JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error parsing JSON file:", err);
    dataMovies = [];
  }
}

// Actualizar
// Usuarios
function updateDataUsersFile() {
  fs.writeFileSync(FilenameUsers, JSON.stringify(dataUsers));
}
// Peliculas
function updateFileMovies() {
  fs.writeFileSync(FilenameMovies, JSON.stringify(dataMovies));
}

// Retornar datos
// Usuarios
app.get("/users", (req, res) => {
  res.json(dataUsers);
});
// Peliculas
app.get("/movies", (req, res) => {
  res.json(dataMovies);
});

// Eliminar
// Usuario por ID
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = dataUsers.findIndex((user, index) => index === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Usuario no encontrado.",
    });
  }

  dataUsers.splice(userIndex, 1);
  updateDataUsersFile();
  res.status(200).json({
    success: true,
    message: "Usuario eliminado exitosamente.",
  });
});

// Pelicula por ID
app.delete("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movieIndex = dataMovies.findIndex((movie) => movie.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Película no encontrada.",
    });
  }

  dataMovies.splice(movieIndex, 1);
  updateFileMovies();
  res.status(200).json({
    success: true,
    message: "Película eliminada exitosamente.",
  });
});

// Endpoint para agregar una nueva película
app.post("/movies", (req, res) => {
  const { category, title, description } = req.body;

  const newMovie = {
    id: new Date().getTime(), // Usar timestamp como ID único
    category,
    title,
    description,
  };

  dataMovies.push(newMovie);
  updateFileMovies();

  res.status(201).json({
    success: true,
    message: "Película agregada exitosamente.",
    movie: newMovie,
  });
});

// Endpoint para actualizar una película por ID
app.put("/admin/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const { category, title, description } = req.body;
  const movieIndex = dataMovies.findIndex((movie) => movie.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Película no encontrada.",
    });
  }

  dataMovies[movieIndex] = {
    ...dataMovies[movieIndex],
    category,
    title,
    description,
  };
  updateFileMovies();
  res.status(200).json({
    success: true,
    message: "Película actualizada exitosamente.",
    movie: dataMovies[movieIndex],
  });
});

// Endpoint el cual retorna un usuario en especifico a partir de su correo
app.get("/users/:correo", (req, res) => {
  const correo = req.params.correo;
  const user = dataUsers.find((user) => user.email === correo);
  if (!user) {
    res.status(404).send({ response: "Elemento no encontrado" });
  } else {
    res.json(user);
  }
});

// Logica Registro
app.post("/register", (req, res) => {
  const { firstName, lastName, email, password, gender, birthDate } = req.body;
  // Verificar si el correo ya está registrado
  const userExists = dataUsers.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "Correo registrado anteriormente, verifique o intente con otro.",
    });
  }

  // Crear nuevo usuario
  const newUser = { firstName, lastName, email, password, gender, birthDate };
  dataUsers.push(newUser);
  updateDataUsersFile();
  res.status(201).json({
    success: true,
    message: "Usuario registrado exitosamente.",
  });
});

// Logica Login
app.post("/login", (req, res) => {
  const data = req.body;

  const tempuser = dataUsers.find((user) => {
    return user.email === data.email && user.password === data.password;
  });

  if (!tempuser) {
    const response = {
      success: false,
      user: null,
    };
    res.status(404).send(response);
  } else {
    const response = {
      success: true,
      user: tempuser,
    };
    res.json(response);
  }
});

// Editar
// Perfil
app.put("/editarperfil", (req, res) => {
  const { firstName, lastName, email, password, gender, birthDate } = req.body;

  const editUserIndex = dataUsers.findIndex((user) => user.email === email);
  if (editUserIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "No se encontró al usuario.",
    });
  }

  dataUsers[editUserIndex].firstName = firstName;
  dataUsers[editUserIndex].lastName = lastName;
  dataUsers[editUserIndex].gender = gender;
  dataUsers[editUserIndex].birthDate = birthDate;
  if (password) {
    dataUsers[editUserIndex].password = password;
  }

  updateDataUsersFile();
  res.status(200).json({
    success: true,
    message: "Perfil actualizado.",
  });
});

// Encender servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
