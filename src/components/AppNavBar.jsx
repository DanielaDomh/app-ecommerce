import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import CartSideBar from "./CartSideBar";
import { useState } from "react";


const AppNavBar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const handleClose = () => setShow(false);
  const handleShow = () => {
    token ? setShow(true) : navigate("/Login")
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/"> <box-icon name='shopping-bag' color='#ffffff'/> SHOPPING APP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Login">Login</Nav.Link>
            <Nav.Link as={Link} to="/Purchases">Purchases</Nav.Link>
            <Nav.Link onClick={handleShow}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <CartSideBar
      show={show}
      handleClose={handleClose}
      />
    </div>
  );
};

export default AppNavBar;
