import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
import Admin from "./components/admin"
import History from "./components/Historial"
import Editar from "./components/editprofile"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/historial" element={<History/>} />
        <Route path="/editarperfil" element={<Editar/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

