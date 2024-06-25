import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías validar los datos de login
    if (correo && password) {
      Swal.fire({
        title: "Bienvenido!",
        text: "Inicio de sesión exitoso!",
        icon: "success"
      }).then(() => {
        navigate('/main');
      });
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
                  type="String"
                  className="form-control"
                  id="floatingInput"
                  placeholder="example@correo.com"
                  onChange={(e) => setCorreo(e.target.value)}
                  value={correo}
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
                <label htmlFor="floatingPassword">Password</label>
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



