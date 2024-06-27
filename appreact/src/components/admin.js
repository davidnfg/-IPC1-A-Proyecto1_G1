import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/admin.css";
import moviesData from './moviesData';
import axios from 'axios';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('usuarios');
  const [users, setUsers] = useState([]);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    category: 'NUEVAS',
    title: '',
    description: '',
    image: null
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (activeTab === 'usuarios') {
      fetchUsers();
    }
  }, [activeTab]);

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${userId}`);
      if (response.status === 200) {
        setUsers(users.filter((user, index) => index !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const movies = JSON.parse(localStorage.getItem('moviesData')) || moviesData;

  const handleAddMovie = async () => {
    const newMovieData = {
      category: newMovie.category,
      title: newMovie.title,
      description: newMovie.description,
      image: newMovie.image.name, // Asumiendo que la ruta es el nombre del archivo
    };
  
    try {
      await axios.post('http://localhost:5000/movies', newMovieData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Actualizar las películas en localStorage
      const updatedMovies = { ...movies };
      const newMovieToAdd = {
        id: movies.length + 1,
        title: newMovie.title,
        description: newMovie.description,
        image: URL.createObjectURL(newMovie.image),
        btn1: "Alquilar",
        btn2: "Comentar",
      };
      updatedMovies[newMovie.category].push(newMovieToAdd);
      localStorage.setItem('moviesData', JSON.stringify(updatedMovies));
      window.dispatchEvent(new Event('storage'));
  
      setShowAddMovieModal(false);
      setNewMovie({ category: 'NUEVAS', title: '', description: '', image: null });
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };
  
  

  return (
    <div className="dark-modeA">
      <Navbar className="navbar-transparent" expand="lg" fixed="top">
        <Navbar.Brand className="netflix-titleA">PopCornFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" onSelect={handleSelect}>
            <Nav.Link eventKey="usuarios" className="nav-link">Usuarios</Nav.Link>
            <Nav.Link eventKey="peliculas" className="nav-link">Películas</Nav.Link>
            <Nav.Link href="/" className="nav-link">Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid className="content-container">
        {activeTab === 'usuarios' && (
          <div className="users-section">
            <h2 className="section-title">Usuarios Registrados</h2>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        {activeTab === 'peliculas' && (
          <div className="movies-section">
            <h2 className="section-title">Películas Existentes</h2>
            <Button variant="success" onClick={() => setShowAddMovieModal(true)}>Agregar película</Button>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(movies).map(([category, moviesList]) => (
                  moviesList.map(movie => (
                    <tr key={movie.id}>
                      <td>{movie.id}</td>
                      <td>{movie.title}</td>
                      <td>
                        <Button variant="warning" size="sm" className="mr-2">Actualizar</Button>
                        <Button variant="danger" size="sm">Eliminar</Button>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>

      <Modal show={showAddMovieModal} onHide={() => setShowAddMovieModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Película</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMovieCategory">
              <Form.Label>Categoría</Form.Label>
              <Form.Control as="select" value={newMovie.category} onChange={(e) => setNewMovie({ ...newMovie, category: e.target.value })}>
                <option value="NUEVAS">NUEVAS</option>
                <option value="TERROR">TERROR</option>
                <option value="COMEDIA">COMEDIA</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formMovieTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formMovieDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} value={newMovie.description} onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formMovieImage">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" onChange={(e) => setNewMovie({ ...newMovie, image: e.target.files[0] })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddMovieModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleAddMovie}>Agregar Película</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
