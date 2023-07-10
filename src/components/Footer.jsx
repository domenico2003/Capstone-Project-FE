import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ImLinkedin, ImGithub } from "react-icons/im";
import { useEffect, useState } from "react";
const Footer = () => {
  const location = useLocation();
  let profile = useSelector((state) => state.profilo.me);
  const [footerStatus, setFooterStatus] = useState(false);
  useEffect(() => {
    if (location.pathname === "/login") {
      setFooterStatus(false);
    } else if (location.pathname === "/registration") {
      setFooterStatus(false);
    } else {
      setFooterStatus(true);
    }
  }, [location.pathname]);

  return (
    <>
      {footerStatus && (
        <div className="bg-terziario text-white-50 footer mt-5 py-5">
          <Container>
            <Row className="justify-content-center">
              <Col xs={8} md={3}>
                <p className="logo h4 text-bianco">gamerHUB</p>
                <p>
                  Questo sito è stato creato con lo scopo di aiutare sempre più
                  persone alla ricerca di nuovi giochi e di nuovi compagni con
                  cui condividere le proprie esperienze e gli obiettivi
                  raggiunti.
                </p>
              </Col>
              <Col
                md={5}
                xs={8}
                className="d-flex flex-column justify-content-between"
              >
                <div>
                  <p className="  h5 text-bianco">Pagine</p>
                  <div className="d-flex flex-column flex-sm-row justify-content-evenly">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/"
                          ? "text-quaternario fw-bold"
                          : ""
                      }`}
                      to={"/"}
                    >
                      Home
                    </Link>
                    <Link
                      className={`nav-link ${
                        location.pathname === "/videogiochi"
                          ? "text-quaternario fw-bold"
                          : ""
                      }`}
                      to={"/videogiochi"}
                    >
                      Videogiochi
                    </Link>
                    <Link
                      className={`nav-link ${
                        location.pathname === "/utenti"
                          ? "text-quaternario fw-bold"
                          : ""
                      }`}
                      to={"/utenti"}
                    >
                      Utenti
                    </Link>
                    <Link
                      className={`nav-link ${
                        location.pathname === "/gruppi"
                          ? "text-quaternario fw-bold"
                          : ""
                      }`}
                      to={"/gruppi"}
                    >
                      Gruppi
                    </Link>
                    {profile !== null && profile?.ruolo === "ADMIN" && (
                      <Link
                        className={`nav-link ${
                          location.pathname === "/admin"
                            ? "text-quaternario fw-bold"
                            : ""
                        }`}
                        to={"/admin"}
                      >
                        Admin
                      </Link>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-end align-items-end mb-4 mt-1">
                  <small>
                    created By Domenico Dattilo{" "}
                    <a
                      className="text-quaternario"
                      href="www.linkedin.com/in/domenico-dattilo"
                    >
                      <ImLinkedin />
                    </a>
                    {"  "}
                    <a
                      className="text-quaternario"
                      href="https://github.com/domenico2003"
                    >
                      {" "}
                      <ImGithub />
                    </a>
                  </small>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};
export default Footer;
