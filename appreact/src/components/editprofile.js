import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Navbar } from 'react-bootstrap';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/editprofile.css';
import axios from 'axios';

const EditProfile = () => {
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    password: ''
  });

  useEffect(() => {
    const storedUserProfile = JSON.parse(localStorage.getItem('userProfile'));

    if (storedUserProfile && storedUserProfile.email) {
      axios.get(`http://localhost:5000/users/${storedUserProfile.email}`)
        .then(response => {
          if (response.data.success) {
            setUserProfile(response.data.user);
          }
        })
        .catch(error => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put('http://localhost:5000/editarperfil', userProfile)
      .then(response => {
        if (response.data.success) {
          const updatedProfile = { ...userProfile };
          delete updatedProfile.password; // limpia la contra

          localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Perfil actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          });

          setUserProfile({
            ...userProfile,
            password: ''
          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al actualizar el perfil',
            text: response.data.message,
            showConfirmButton: true
          });
        }
      })
      .catch(error => {
        console.error("Error updating profile:", error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al actualizar el perfil',
          text: error.message,
          showConfirmButton: true
        });
      });
  };

  return (
    <div className="dark-modeH">
      <Navbar className="navbar-transparent" expand="lg" fixed="top">
        <Navbar.Brand href="/main" className="netflix-titleH">PopCornFlix</Navbar.Brand>
      </Navbar>
      <Container className="edit-profile-container">
        <h2 className="section-title">Editar Perfil</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={userProfile.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={userProfile.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userProfile.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBirthDate">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              value={userProfile.birthDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={userProfile.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Guardar Cambios
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default EditProfile;