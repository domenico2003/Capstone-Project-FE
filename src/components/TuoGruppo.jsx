import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NoAccessContent from "./NoAccessContent";
import MembriGruppo from "./MembriGruppo";
import Messaggistica from "./Messaggistica";
import { useDispatch, useSelector } from "react-redux";
import { profileFetch } from "../redux/actions";

const TuoGruppo = ({ mioGruppo }) => {
  let profile = useSelector((state) => state.profilo.me);
  const [gruppo, setGruppo] = useState(null);
  const [abbandonaShow, setAbbandonaShow] = useState(false);
  const [uniscitiShow, setUniscitiShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (location.pathname === "/me") {
      setGruppo(mioGruppo);
    } else {
      gruppiDetailsFetch();
    }
  }, [profile]);

  const handleAbbandonaClick = () => {
    abbandonaGruppiFetch();
  };
  const handleUniscitiClick = () => {
    uniscitiGruppoFetch();
  };

  const uniscitiGruppoFetch = async () => {
    const URL =
      "http://localhost:3001/utente/" + profile?.id + "?gruppoId=" + gruppo.id;
    const headers = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        setUniscitiShow(true);
        dispatch(profileFetch());
        setTimeout(() => {
          setUniscitiShow(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const abbandonaGruppiFetch = async () => {
    const URL = "http://localhost:3001/utente/" + profile?.id;
    const headers = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        dispatch(profileFetch());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const gruppiDetailsFetch = async () => {
    const URL = "http://localhost:3001/gruppo/" + params.id;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        setGruppo(dato);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {gruppo != null && (
        <div className="mt-5">
          <Row className="justify-content-center ">
            <Col xs={10} md={4} className="d-flex justify-content-center">
              <img
                src={gruppo?.immagineGruppo}
                alt={gruppo?.nome}
                className="img-fluid gruppoImmagine"
              />
            </Col>
            <Col
              xs={10}
              md={8}
              className="d-flex flex-column justify-content-between"
            >
              <div>
                <div className="d-flex align-items-center justify-content-center">
                  <p className="text-center text-bianco h2 fw-bold mt-3 mt-md-0">
                    {gruppo?.nome}
                  </p>
                  {gruppo?.id === profile?.gruppo?.id && (
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-4"
                      onClick={() => setAbbandonaShow(true)}
                    >
                      Abbandona
                    </Button>
                  )}
                  {profile?.gruppo === null && (
                    <Button
                      variant="success"
                      size="sm"
                      className="ms-4"
                      onClick={() => handleUniscitiClick()}
                    >
                      Unisciti!
                    </Button>
                  )}
                </div>
                <hr className="border-3 opacity-none border-quaternario mb-0" />
              </div>
              <Row xs={1} md={2} className=" flex-grow-1">
                <Col className="d-flex flex-column justify-content-around">
                  <div>
                    <p className="m-0 text-quaternario fw-bold">Descrizione:</p>
                    <p className="text-white-50">{gruppo?.descrizione}</p>
                  </div>
                  <div>
                    <p className="m-0 mb-2 text-quaternario fw-bold">
                      Fondatore:
                    </p>
                    {gruppo?.fondatore !== null ? (
                      <>
                        <Row
                          className="pointer"
                          onClick={() =>
                            navigate("/profilo/" + gruppo?.fondatore?.id)
                          }
                        >
                          <Col
                            xs={2}
                            className=" bg-secondario d-flex justify-content-center align-items-center"
                          >
                            <img
                              className="immagine-nav pointer"
                              alt={
                                gruppo?.fondatore?.nome +
                                " " +
                                gruppo?.fondatore?.cognome
                              }
                              src={gruppo?.fondatore?.immagineProfilo}
                            />
                          </Col>
                          <Col
                            xs={10}
                            md={8}
                            lg={7}
                            xl={5}
                            className="bg-secondario"
                          >
                            {" "}
                            <p className="text-bianco fw-bold m-0 text-truncate">
                              {gruppo?.fondatore?.nome}{" "}
                              {gruppo?.fondatore.cognome}
                            </p>
                            <small className="text-white-50 m-0 text-truncate">
                              {gruppo?.fondatore?.email}
                            </small>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <p className="text-white-50 text-center">
                        Questo gruppo attualmente non ha un fondatore!
                      </p>
                    )}
                  </div>
                </Col>
                <Col className="d-flex flex-column justify-content-around">
                  <div>
                    <p className="m-0 text-quaternario fw-bold">
                      Data creazione:
                    </p>
                    <p className="text-white-50">{gruppo?.dataCreazione}</p>
                  </div>
                  <div>
                    <p className="m-0 text-quaternario fw-bold">Argomenti:</p>
                    <div>
                      {gruppo.argomenti.map((argomento, index) => (
                        <span
                          className="text-white-50"
                          key={index + "piattaforma1"}
                        >
                          {argomento.nome}
                          {index < gruppo.argomenti.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          {location.pathname !== "/me" && (
            <Tabs
              defaultActiveKey="profile"
              id="fill-tab-example"
              className="mb-3 mt-4 border-0"
              fill
            >
              <Tab eventKey="Post" title="Post">
                <Messaggistica idGruppo={gruppo?.id} />
              </Tab>
              <Tab eventKey="Membri" title="Membri">
                <MembriGruppo idGruppo={gruppo?.id} />
              </Tab>
            </Tabs>
          )}
        </div>
      )}

      {gruppo === null &&
        (location.pathname !== "/me" ? (
          <NoAccessContent />
        ) : (
          <div className="d-flex flex-column align-items-center text-bianco">
            <p className="m-0 fw-bold display-4">⚠️ATTENZIONE⚠️</p>
            <p className="m-0 fw-bold h4 text-center">
              attualmente non fai parte di nessun gruppo
            </p>
          </div>
        ))}
      <Modal
        size="md"
        show={abbandonaShow}
        onHide={() => setAbbandonaShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        className="text-bianco"
      >
        <Modal.Header closeButton className="bg-secondario">
          <Modal.Title id="example-modal-sizes-title-sm">
            Abbandona gruppo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-secondario d-flex flex-column align-items-center">
          <p className="text-center">Sicuro di voler abbandonare il gruppo?</p>
          <div>
            <Button
              variant="danger"
              size="sm"
              className="ms-4"
              onClick={() => {
                handleAbbandonaClick();
                setAbbandonaShow(false);
              }}
            >
              Abbandona
            </Button>
            <Button
              variant="outline-quaternario"
              size="sm"
              className="ms-4"
              onClick={() => setAbbandonaShow(false)}
            >
              Chiudi
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        size="md"
        show={uniscitiShow}
        aria-labelledby="example-modal-sizes-title-sm"
        className="text-bianco"
      >
        <Modal.Body className="bg-secondario d-flex flex-column align-items-center">
          <p className="text-success text-center fw-bold">
            ✅ti sei unito correttamente al gruppo✅
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default TuoGruppo;
