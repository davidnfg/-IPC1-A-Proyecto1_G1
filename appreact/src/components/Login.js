import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        //
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        const result = await response.json();
        if (response.ok) {
          Swal.fire({
            title: "Bienvenido!",
            text: result.message,
            icon: "success"
          }).then(() => {
            navigate('/main');
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.message,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal. Por favor intenta de nuevo.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Correo o contraseña incorrectos.",
      });
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-background">
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Inicio de Sesión</h2>
            <form onSubmit={handleSubmit} className='form-signin w-100 m-auto'>
              <div className="form-floating mb-3" style={{ width: "100%" }}>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="example@correo.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <label htmlFor="floatingInput">Correo</label>
              </div>
              <div className="form-floating mb-3" style={{ width: "100%" }}>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <label htmlFor="floatingPassword">Contraseña</label>
              </div>
              <div className="text-center mb-3">
                <button type="submit" className="btn btn-outline-primary btn-lg">Iniciar Sesión</button>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-link" onClick={handleRegister}>Registrarse</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
