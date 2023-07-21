import { useState } from "react";
import { useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NoAccessContent from "./NoAccessContent";
import StarVideogioco from "./StarVideogioco";
import Recensioni from "./Recensioni";
import { IoMdSettings } from "react-icons/io";
import ModaleResponsabile from "./ModaleResponsabile";
import ModalAggiungiVideogioco from "./ModalAggiungiVideogioco";
import ModalSuccessAction from "./ModalSuccessAction";

const DettaglioVideogioco = () => {
  let profile = useSelector((state) => state.profilo.me);
  const navigate = useNavigate();
  const params = useParams();
  const [videogioco, setVideogioco] = useState(null);
  const [isPreferito, setIsPreferito] = useState(null);
  const [modificaVideogioco, setModificaVideogioco] = useState(false);
  const [modaleResponsabile, setModaleResponsabile] = useState(false);
  const [modaleDelete, setModaleDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const eliminaVideogioco = async () => {
    const URL = "http://localhost:3001/videogioco/" + videogioco?.id;
    const headers = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        setDeleteSuccess(true);

        setTimeout(() => {
          setDeleteSuccess(false);
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    videogiocoDetails();
  }, []);
  useEffect(() => {
    if (videogioco !== null) {
      isPreferitiFetch(videogioco);
    }
  }, [videogioco]);

  const videogiocoDetails = async () => {
    const URL = "http://localhost:3001/videogioco/all/" + params.id;
    try {
      let risposta = await fetch(URL);
      if (risposta.ok) {
        let dato = await risposta.json();

        setVideogioco(dato);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isPreferitiFetch = async (videogiocoTrovato) => {
    const URL =
      "http://localhost:3001/preferiti/isPreferito?idUtente=" +
      profile?.id +
      "&idVideogioco=" +
      videogiocoTrovato.id;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        setIsPreferito(dato);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const aggiungiAiPreferiti = async () => {
    const URL = "http://localhost:3001/preferiti";
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        utenteId: profile?.id,
        giocoId: videogioco?.id,
      }),
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        isPreferitiFetch(videogioco);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const rimuoviDaiPreferiti = async () => {
    const URL = "http://localhost:3001/preferiti/" + isPreferito?.id;
    const headers = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        isPreferitiFetch(videogioco);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {localStorage.getItem("token") != null ? (
        <Container fluid className="text-bianco">
          {/* header */}

          <Row className=" justify-content-center ">
            <Col xs={10} md={3} className="bg-secondario">
              <div className="copertina d-flex align-items-center flex-column pt-5">
                {(videogioco?.copertina !== "" ||
                  videogioco?.copertina !== null) && (
                  <Card.Img
                    variant="top"
                    src={videogioco?.copertina}
                    className="rounded-4 "
                  />
                )}
                <div className="d-flex flex-column align-items-strech mt-2 w-custom ">
                  {isPreferito !== null ? (
                    <Button
                      variant="danger"
                      onClick={() => rimuoviDaiPreferiti()}
                    >
                      Rimuovi dai preferiti
                    </Button>
                  ) : (
                    <Button
                      variant="quaternario"
                      onClick={() => aggiungiAiPreferiti()}
                    >
                      Aggiungi ai preferiti
                    </Button>
                  )}
                </div>
              </div>
            </Col>
            <Col xs={10} md={9} className="bg-secondario pt-5">
              <div>
                <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between">
                  <p className="h2 justify-content-center flex-column flex-md-row  d-flex align-items-center justify-content-md-start ">
                    <span className="me-md-3">{videogioco?.nome}</span>
                    {videogioco !== null && (
                      <StarVideogioco
                        videogioco={videogioco}
                        className="text-quaternario h3 m-0"
                      />
                    )}
                  </p>
                  {videogioco?.responsabile?.id === profile?.id && (
                    <Dropdown className="d-flex justify-content-center justify-content-md-end">
                      <Dropdown.Toggle
                        drop={"down-centered"}
                        className={`text-white-50  border-0 clicked`}
                        id="dropdown-basic"
                      >
                        <IoMdSettings className="h3 m-0" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="bg-primario border-2 border-quaternario p-0 ">
                        <div className="d-flex flex-column w-100 ">
                          <Button
                            variant="outline-danger"
                            className="mb-2 border-0 border-bottom border-danger border-3"
                            onClick={() => setModaleDelete(true)}
                          >
                            Elimina videogioco
                          </Button>
                          <Button
                            variant="outline-quaternario"
                            className=" border-0 border-top border-quaternario border-3"
                            onClick={() => setModificaVideogioco(true)}
                          >
                            Modifica
                          </Button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
                <p className="text-white-50 text-center text-md-start">
                  {videogioco?.descrizione}
                </p>
              </div>
            </Col>
          </Row>

          {/* main */}
          <Row className="mt-2">
            <Col xs={10} md={3} className="d-none d-md-block"></Col>
            <Col xs={12} md={9} className="">
              <Container>
                <Row xs={1} sm={2}>
                  <Col className="d-flex d-md-block flex-column align-items-center">
                    <p className="m-0 fw-bold">Data Rilascio:</p>
                    <p className="m-0 text-white-50">
                      {videogioco?.dataRilascio}
                    </p>
                    <hr className="border-3 opacity-none border-quaternario mb-0" />
                    <p className="m-0 fw-bold">Azienda proprietaria:</p>
                    <p className="m-0 text-white-50">
                      {videogioco?.aziendaProprietaria}
                    </p>
                    <hr className="border-3 opacity-none border-quaternario mb-0" />
                    <p className="m-0 fw-bold">Responsabile:</p>
                    {videogioco?.responsabile !== null ? (
                      <Row
                        className="pointer"
                        onClick={() =>
                          navigate("/profilo/" + videogioco?.responsabile?.id)
                        }
                      >
                        <Col
                          xs={2}
                          className=" bg-secondario d-flex justify-content-center align-items-center"
                        >
                          <img
                            className="immagine-nav pointer"
                            alt={
                              videogioco?.responsabile?.nome +
                              " " +
                              videogioco?.responsabile?.cognome
                            }
                            src={videogioco?.responsabile?.immagineProfilo}
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
                            {videogioco?.responsabile?.nome}{" "}
                            {videogioco?.responsabile?.cognome}
                          </p>
                          <small className="text-white-50 m-0 text-truncate">
                            {videogioco?.responsabile?.email}
                          </small>
                        </Col>
                      </Row>
                    ) : profile.ruolo === "ADMIN" ? (
                      <Button
                        variant="outline-quaternario"
                        onClick={() => setModaleResponsabile(true)}
                      >
                        Aggiungi Responsabile
                      </Button>
                    ) : (
                      <p className="text-white-50 text-center">
                        Questo gruppo attualmente non ha un Responsabile!
                      </p>
                    )}
                  </Col>
                  <Col className="d-flex d-md-block flex-column align-items-center">
                    {videogioco?.generi.length > 0 && (
                      <>
                        <p className="m-0 fw-bold">Generi:</p>
                        <p className="m-0 text-white-50 text-center text-md-start">
                          {videogioco?.generi.map((genere, index) => (
                            <span key={index + "genereVideogioco"}>
                              <span>{genere?.nome}</span>
                              {index < videogioco?.generi.length - 1 && ", "}
                            </span>
                          ))}
                        </p>{" "}
                        <hr className="border-3 opacity-none border-quaternario mb-0" />
                      </>
                    )}
                    <p className="m-0 fw-bold">Piattaforme:</p>
                    <p className="m-0 text-white-50 text-center text-md-start">
                      {videogioco?.piattaforme.map((piattaforma, index) => (
                        <span key={index + "piattaformaVideogioco"}>
                          <span>{piattaforma}</span>
                          {index < videogioco?.piattaforme.length - 1 && ", "}
                        </span>
                      ))}
                    </p>{" "}
                    <hr className="border-3 opacity-none border-quaternario mb-0" />
                    <p className="m-0 fw-bold">Azienda proprietaria:</p>
                    <p className="m-0 text-white-50">
                      {videogioco?.aziendaProprietaria}
                    </p>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <Col
              xs={11}
              sm={9}
              md={8}
              className="d-flex flex-column align-items-center"
            >
              <p className="h3 fw-bold">Guarda il trailer:</p>
              <iframe
                className="videoTrailer"
                src={`https://www.youtube.com/embed/${
                  videogioco?.videoTrailer.split("v=")[1]
                }`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </Col>
          </Row>
          {/* recensioni */}
          <Container className="mt-5">
            {" "}
            <Recensioni
              fetchvid={() => videogiocoDetails()}
              videogioco={videogioco}
            />
          </Container>
          {modaleResponsabile && (
            <ModaleResponsabile
              show={modaleResponsabile}
              onHide={() => setModaleResponsabile(false)}
              giocoId={videogioco?.id}
              fetch={() => videogiocoDetails()}
            />
          )}
          {modificaVideogioco && (
            <ModalAggiungiVideogioco
              show={modificaVideogioco}
              onHide={() => setModificaVideogioco(false)}
              videogioco={videogioco}
              fetch={() => videogiocoDetails()}
            />
          )}
          {modaleDelete && (
            <Modal
              size="md"
              show={modaleDelete}
              onHide={() => setModaleDelete(false)}
              aria-labelledby="example-modal-sizes-title-sm"
              className="text-bianco"
            >
              <Modal.Header closeButton className="bg-secondario">
                <Modal.Title id="example-modal-sizes-title-sm">
                  Elimina recensione
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-secondario d-flex flex-column align-items-center">
                <p className="text-center">
                  Sicuro di voler eliminare la recensione?
                </p>
                <div>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-4"
                    onClick={() => {
                      eliminaVideogioco();
                    }}
                  >
                    Elimina
                  </Button>
                  <Button
                    variant="outline-quaternario"
                    size="sm"
                    className="ms-4"
                    onClick={() => modaleDelete(false)}
                  >
                    Chiudi
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          )}
          {deleteSuccess && (
            <ModalSuccessAction
              text={"Videogioco eliminato con successo"}
              show={deleteSuccess}
            />
          )}
        </Container>
      ) : (
        <NoAccessContent />
      )}
    </>
  );
};
export default DettaglioVideogioco;
