import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo_navbar from '../assets/images/logo_blanco.png';
import '../styles/navbar.css';

function CustomNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand href="/">
          <img className='logo-navbar' src={logo_navbar} alt='Logo'/>
          Signify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar">
          <i className="fa-solid fa-bars fa-lg"></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link href="/">Traductor</Nav.Link>
            <NavDropdown title="Herramientas" id="dropdown-conoce">
              <NavDropdown.Item><i class="fa-solid fa-circle-plus"></i>  Agregar dispositivo</NavDropdown.Item>
              <NavDropdown.Divider></NavDropdown.Divider>
              <NavDropdown.Item href="/abecedario">Abecedario</NavDropdown.Item>
              <NavDropdown.Item href="/diccionario">Diccionario</NavDropdown.Item>
              <NavDropdown.Divider></NavDropdown.Divider>
              <NavDropdown.Item href="/">Nombre empresa</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/">Sobre nosotros</Nav.Link>
          </Nav>

          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link href="/perfil">
                  <i className="fa-solid fa-user fa-lg"><span className='perfil'>Mi perfil</span></i>
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Iniciar sesión</Nav.Link>
                <Nav.Link href="/signup">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
