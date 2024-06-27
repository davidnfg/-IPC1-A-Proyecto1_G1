//Dependencias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

//Backend
const app = express();
//Puerto
const PORT = 3000;
//Archivos
const FilenameUsers = 'Users.json';
const FilenameMovies = 'Movies.json';

//Aumento de limite
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//Especificar al framework
app.use(bodyParser.json());
app.use(cors());

//Simulacion base de datos
let dataUsers = [];
let dataMovies = [];

//Permanecer datos
//Usuarios
if (!fs.existsSync(FilenameUsers)) {
    fs.writeFileSync(FilenameUsers, JSON.stringify(dataUsers));
} else {
    try {
        const fileData = fs.readFileSync(FilenameUsers, 'utf-8');
        if (fileData) {
            dataUsers = JSON.parse(fileData);
        }
    } catch (err) {
        console.error("Error parsing JSON file:", err);
        dataUsers = [];
    }
}
//Peliculas
if (!fs.existsSync(FilenameMovies)) {
    fs.writeFileSync(FilenameMovies, JSON.stringify(dataMovies));
} else {
    try {
        const fileData = fs.readFileSync(FilenameMovies, 'utf-8');
        if (fileData) {
            dataMovies = JSON.parse(fileData);
        }
    } catch (err) {
        console.error("Error parsing JSON file:", err);
        dataMovies = [];
    }
}

//Actualizar
//Usuarios
function updateDataUsersFile() {
    fs.writeFileSync(FilenameUsers, JSON.stringify(dataUsers));
}
//Peliculas
function updateDataMoviesFile() {
    fs.writeFileSync(FilenameMovies, JSON.stringify(dataMovies));
}

//Retornar datos
//usuarios
app.get('/users', (req, res) => {
    res.json(dataUsers);
});
//Peliculas
app.get('/movies', (req, res) => {
    res.json(dataMovies);
});

// Endpoint el cual retorna un usuario en especifico a partir de su correo
app.get('/users/:correo', (req, res) => {
    const correo = req.params.correo;
    const user = dataUsers.find(user => user.email === correo);
    if (!user) {
        res.status(404).send({ response: 'Elemento no encontrado' });
    } else {
        res.json(user);
    }
});

//Logica Registro
app.post('/register', (req, res) => {
    const { firstName, lastName, email, password, gender, birthDate } = req.body;
    // Verificar si el correo ya está registrado
    const userExists = dataUsers.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({
            success: false,
            message: "Correo registrado anteriormente, verifique o intente con otro."
        });
    }
    // Crear nuevo usuario
    const newUser = { firstName, lastName, email, password, gender, birthDate };
    dataUsers.push(newUser);
    updateDataUsersFile();
    res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente."
    });
});

//Logica Login
app.post('/login', (req, res) => {
    const data = req.body;

    const tempuser = dataUsers.find(user => {
        return user.email === data.email && user.password === data.password;
    });

    if (!tempuser) {
        const response = {
            success: false,
            user: null
        };
        res.status(404).send(response);
    } else {
        const response = {
            success: true,
            user: tempuser
        };
        res.json(response);
    }
});

//Editar
//Perfil
app.put('/profile', (req, res) => {
    const { firstName, lastName, email, password, gender, birthDate } = req.body;
    
    // Encontrar el usuario por correo
    const editUserIndex = dataUsers.findIndex(user => user.email === email);
    if (editUserIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "No se encontró al usuario."
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
        message: "Perfil actualizado."
    });
});

//Peliculas
app.put('/movies', (req, res) => {
    const { title, synopsis, rentalPrice, director, releaseYear, duration, description } = req.body;
    
    const editMovieIndex = dataMovies.findIndex(movie => movie.title === title);

    if (editMovieIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Pelicula no encontrada."
        });
    }

    dataMovies[editMovieIndex].title = title;
    dataMovies[editMovieIndex].synopsis = synopsis;
    dataMovies[editMovieIndex].rentalPrice = rentalPrice;
    dataMovies[editMovieIndex].director = director;
    dataMovies[editMovieIndex].releaseYear = releaseYear;
    dataMovies[editMovieIndex].duration = duration;
    dataMovies[editMovieIndex].description = description;
    
    updateDataMoviesFile();
    res.status(200).json({
        success: true,
        message: "Pelicula actualizada."
    });
});

//Añadir pelicula
app.post('/movies', (req, res) => {
    const { title, synopsis, rentalPrice, director, releaseYear, duration, description } = req.body;
    const movieExists = dataMovies.find(movie => movie.title === title);
    if (movieExists) {
        return res.status(400).json({
            success: false,
            message: "La película ya está registrada, intente con otra."
        });
    }
    const newMovie = { title, synopsis, rentalPrice, director, releaseYear, duration, description };
    dataMovies.push(newMovie);
    updateDataMoviesFile();
    res.status(201).json({
        success: true,
        message: "Película registrada exitosamente."
    });
});

//Encender servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
