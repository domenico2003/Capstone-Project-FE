import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MyNavbar = () => {
  let profile = useSelector((state) => state.profilo.me);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Navbar
      expand="md"
      className="bg-terziario shadow "
      sticky="top"
      data-bs-theme="dark"
    >
      <Container>
        <Link to={"/"} className="navbar-brand logo  brand mb-0">
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
            {/* <Link
              className={`nav-link ${
                location.pathname === "/utenti" ? "text-bianco fw-bold" : ""
              }`}
              to={"/utenti"}
            >
              Utenti
            </Link> */}
            <Link
              className={`nav-link ${
                location.pathname === "/gruppi" ? "text-bianco fw-bold" : ""
              }`}
              to={"/gruppi"}
            >
              Gruppi
            </Link>
            {profile !== null && profile?.ruolo === "ADMIN" && (
              <Link
                className={`nav-link ${
                  location.pathname === "/admin" ? "text-bianco fw-bold" : ""
                }`}
                to={"/admin"}
              >
                Admin
              </Link>
            )}
          </Nav>
          {profile === null ? (
            <Button
              variant="quaternario"
              className="ms-auto text-bianco"
              onClick={() => navigate("/login")}
            >
              Accedi
            </Button>
          ) : (
            <img
              className="immagine-nav pointer"
              alt={profile?.nome + " " + profile?.cognome}
              src={profile?.immagineProfilo}
              onClick={() => navigate("/me")}
            />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNavbar;
