import React from "react";
import "./Navbar.css";
import Nav from "react-bootstrap/Nav";
import NavbarBoot from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Navbar = () => {
  return (
      <NavbarBoot expand="lg" className="bg-body-tertiary navbar-main">
        <NavbarBoot.Brand as={Link} to="/"><img src="/logo/Logo.png" alt="Navbar logo"/></NavbarBoot.Brand>
        <NavbarBoot.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBoot.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/product">Products</Nav.Link>
          </Nav>
        <Button variant="primary" as={Link} to="/signup">Signup</Button>
        </NavbarBoot.Collapse>
      </NavbarBoot>
  );
};

export default Navbar;
