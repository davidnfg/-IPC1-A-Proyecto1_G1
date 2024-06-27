import React, { useState, useEffect } from 'react';
import { Container, Navbar, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Historial.css';
import moviesData from './moviesData';

const Historial = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const storedRentals = JSON.parse(localStorage.getItem('Historial')) || [];
    setRentals(storedRentals);
  }, []);

  const handleReturn = (index) => {
    const updatedRentals = rentals.filter((_, i) => i !== index);
    const returnedMovie = rentals[index];

    setRentals(updatedRentals);
    localStorage.setItem('Historial', JSON.stringify(updatedRentals));

    const storedMovies = JSON.parse(localStorage.getItem('moviesData')) || moviesData;
    const category = returnedMovie.category;

    if (category) {
      if (!storedMovies[category]) {
        storedMovies[category] = [];
      }
      storedMovies[category].push(returnedMovie);
      localStorage.setItem('moviesData', JSON.stringify(storedMovies));

      const updatedRentedMovies = JSON.parse(localStorage.getItem('rentedMovies')) || [];
      const filteredRentedMovies = updatedRentedMovies.filter(movie => movie.title !== returnedMovie.title);
      localStorage.setItem('rentedMovies', JSON.stringify(filteredRentedMovies));

      window.dispatchEvent(new Event('storage'));
    }
  };

  return (
    <div className="dark-modeH">
      <Navbar className="navbar-transparent" expand="lg" fixed="top">
        <Navbar.Brand href="/main" className="netflix-titleH">PopCornFlix</Navbar.Brand>
      </Navbar>
      <Container fluid className="content-container">
        <div className="rental-history-section">
          <h2 className="section-title">Historial de Alquileres</h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Título</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((rental, index) => (
                <tr key={index}>
                  <td>{rental.title}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleReturn(index)}>Devolver</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default Historial;
