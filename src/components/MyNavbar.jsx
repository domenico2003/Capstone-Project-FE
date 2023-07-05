import { useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Navbar expand="md" className="bg-terziario shadow " data-bs-theme="dark">
      <Container>
        <Link to={"/"} className="navbar-brand logo  fs-1">
          gamerHUB
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              className={`nav-link ${
                location.pathname === "/" ? "text-bianco fw-bold" : ""
              }`}
              to={"/"}
            >
              Home
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/videogiochi"
                  ? "text-bianco fw-bold"
                  : ""
              }`}
              to={"/videogiochi"}
            >
              Videogiochi
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/utenti" ? "text-bianco fw-bold" : ""
              }`}
              to={"/utenti"}
            >
              Utenti
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/gruppi" ? "text-bianco fw-bold" : ""
              }`}
              to={"/gruppi"}
            >
              Gruppi
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/admin" ? "text-bianco fw-bold" : ""
              }`}
              to={"/admin"}
            >
              Admin
            </Link>
          </Nav>
          <Button
            variant="quaternario"
            className="ms-auto text-bianco"
            onClick={() => navigate("/login")}
          >
            Accedi
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNavbar;
