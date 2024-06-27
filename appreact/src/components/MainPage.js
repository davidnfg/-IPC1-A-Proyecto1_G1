
import React, { useState } from 'react';
import { Container, Row, Col, Offcanvas, Nav, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/MainPage.css';
import Banner from './Hero';
import FlipCard from './FlipCard';
import moviesData from './moviesData';

const MainPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="dark-mode">
      <Container fluid>
        <div className="header">
          <button className="btn btn-outline-light menu-button" onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12.5a.5.5 0 0 0 0 1h11a.5.5.5 0 0 0 0-1h-11zm0-5a.5.5.5 0 0 0 0 1h11a.5.5.5 0 0 0 0-1h-11zm0-5a.5.5.5 0 0 0 0 1h11a.5.5.5 0 0 0 0-1h-11z"/>
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
              <Nav.Link href='/historial'>Tus Alquileres</Nav.Link>
              <Nav.Link eventKey="link-2">Editar Perfil</Nav.Link>
              <Nav.Link href='/'>Log Out</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
        <div className="carousel-section">
          <Banner />
        </div>
        {Object.entries(moviesData).map(([category, movies]) => (
          <div className="movies-section" key={category}>
            <h3 className="category-title">{category}</h3>
            <Carousel interval={null} indicators={false}>
              {movies.reduce((rows, movie, index) => {
                if (index % 5 === 0) rows.push([]);
                rows[rows.length - 1].push(movie);
                return rows;
              }, []).map((row, rowIndex) => (
                <Carousel.Item key={rowIndex}>
                  <Row className="justify-content-center">
                    {row.map((movie, colIndex) => (
                      <Col key={colIndex} xs={6} sm={4} md={3} lg={2} className="mb-2">
                        <FlipCard
                          image={movie.image}
                          title={movie.title}
                          description={movie.description}
                          btn1={movie.btn1}
                          btn2={movie.btn2}
                        />
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default MainPage;









