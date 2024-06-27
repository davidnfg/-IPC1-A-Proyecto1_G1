import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Historial.css';

const Historial = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    // Recuperar los datos del historial desde el almacenamiento local al montar el componente
    const storedRentals = JSON.parse(localStorage.getItem('Historial')) || [];
    setRentals(storedRentals);
  }, []);

  const handleReturn = (index) => {
    const updatedRentals = rentals.filter((_, i) => i !== index);
    setRentals(updatedRentals);
    localStorage.setItem('Historial', JSON.stringify(updatedRentals));
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

