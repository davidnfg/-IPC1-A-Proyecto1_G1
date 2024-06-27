import React, { useState } from 'react';
import { Container, Navbar, Nav, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/admin.css";
import moviesData from './moviesData';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('usuarios');

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const users = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
    // Añade más usuarios según sea necesario
  ];

  const movies = Object.values(moviesData).flat();

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
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button variant="danger" size="sm">Eliminar</Button>
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
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {movies.map(movie => (
                  <tr key={movie.id}>
                    <td>{movie.id}</td>
                    <td>{movie.title}</td>
                    <td>
                      <Button variant="warning" size="sm" className="mr-2">Actualizar</Button>
                      <Button variant="danger" size="sm">Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Admin;
