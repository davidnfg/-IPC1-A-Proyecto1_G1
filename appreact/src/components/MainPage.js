import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Offcanvas, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/MainPage.css'; // Asegúrate de importar tu archivo CSS
import Carousel from './Carousel';

const MainPage = () => {
  // Aquí deberías cargar las películas desde una API o base de datos
  const movies = [
    { title: 'Brazzers House', description: 'La increble serie de brazzers' },
    { title: 'Movie 2', description: 'Description 2' },
    { title: 'Movie 3', description: 'Description 3' },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="dark-mode">
      <Container fluid>
        <div className="header">
          <button className="btn btn-outline-light menu-button" onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12.5a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm0-5a.5.5 0 0 0 0 1h11a.5.5.5 0 0 0 0-1h-11zm0-5a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11z"/>
            </svg>
          </button>
          <h2 className="netflix-title">PopCornFlix</h2>
        </div>
        <Offcanvas show={show} onHide={handleClose} backdrop="static">
          <Offcanvas.Header closeButton className='custom-offcanvas-header'>
            <Offcanvas.Title className='netflix-title'>PopCornFlix</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link href="/home">Historial de alquiler</Nav.Link>
              <Nav.Link eventKey="link-1">Devolver Película</Nav.Link>
              <Nav.Link eventKey="link-2">Editar Perfil</Nav.Link>
              <Nav.Link href='/'>Log Out</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
        <div className="carousel-section">
          <Carousel />
        </div>
        <div className="movies-section">
          <Row>
            {movies.map((movie, index) => (
              <Col key={index} md={4}>
                <Card className="dark-card">
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default MainPage;






