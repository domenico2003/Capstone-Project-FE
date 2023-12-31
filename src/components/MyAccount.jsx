import {
  Button,
  Col,
  Container,
  Dropdown,
  Modal,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setProfileAction } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NoAccessContent from "./NoAccessContent";
import { IoMdSettings } from "react-icons/io";
import { useEffect } from "react";
import TuoGruppo from "./TuoGruppo";
import TuoiPost from "./TuoiPost";
import { useState } from "react";
import GrigliaVideogiochi from "./GrigliaVideogiochi";
import ModalSuccessAction from "./ModalSuccessAction";
import ModalModificaAccount from "./ModalModificaAccount";
import GrigliaGruppi from "./GrigliaGruppi";

const MyAccount = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let profile = useSelector((state) => state.profilo.me);
  const [videogiochi, setVideogiochi] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [videogiochiPreferiti, setVideogiochiPreferiti] = useState([]);
  const [paginaPreferiti, setPaginaPreferiti] = useState(0);
  const [spinnerPreferiti, setSpinnerPreferiti] = useState(false);
  const [isLastPreferitiPage, setIsLastPreferitiPage] = useState(false);
  const [isFirstPreferitiPage, setIsFirstPreferitiPage] = useState(false);
  const [modificaModale, setModificaModale] = useState(false);
  const [eliminaModale, setEliminaModale] = useState(false);
  const [eliminaSuccess, setEliminaSuccess] = useState(false);
  const [gruppi, setGruppi] = useState(null);
  const [paginaGruppi, setPaginaGruppi] = useState(0);
  const [spinnerGruppi, setSpinnerGruppi] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setProfileAction(null));
    navigate("/login");
  };

  const handleEliminaAccountClick = async () => {
    const URL = "http://localhost:3001/utente/" + profile?.id;
    const headers = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        setEliminaSuccess(true);

        setTimeout(() => {
          setEliminaSuccess(false);
          handleLogout();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    videogiochiFetch();
  }, [pagina]);

  useEffect(() => {
    videogiochiPreferitiFetch();
  }, [paginaPreferiti]);

  useEffect(() => {
    gruppiCreatiFetch();
  }, [paginaGruppi]);

  const videogiochiFetch = async () => {
    setSpinner(true);
    const URL =
      "http://localhost:3001/videogioco/all?size=20&page=" +
      pagina +
      "&responsabileEmail=" +
      profile?.email;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        setVideogiochi(dato);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSpinner(false);
      }, 1500);
    }
  };

  const videogiochiPreferitiFetch = async () => {
    setSpinnerPreferiti(true);
    const URL =
      "http://localhost:3001/preferiti/" +
      profile?.id +
      "?page=" +
      paginaPreferiti;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        const contenuto = dato.content;
        let preferiti = [];
        contenuto.forEach((preferito) => {
          preferiti = [
            ...preferiti,
            { ...preferito?.gioco, idPreferito: preferito.id },
          ];
        });

        setIsFirstPreferitiPage(dato.first);
        setIsLastPreferitiPage(dato.last);
        setVideogiochiPreferiti(preferiti);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSpinnerPreferiti(false);
      }, 1500);
    }
  };

  //fetch gruppi creati da me
  const gruppiCreatiFetch = async () => {
    setSpinnerGruppi(true);
    const URL =
      "http://localhost:3001/gruppo?size=20&page=" +
      paginaGruppi +
      "&idFondatore=" +
      profile?.id;

    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        setGruppi(dato);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSpinnerGruppi(false);
      }, 1500);
    }
  };
  return (
    <>
      <Container className="mt-5">
        {localStorage.getItem("token") != null ? (
          <>
            <Row className="justify-content-center justify-content-md-start">
              <Col
                xs={12}
                md={4}
                className="d-flex justify-content-center d-md-block"
              >
                {" "}
                <img
                  src={profile?.immagineProfilo}
                  alt={profile?.nome}
                  className="img-fluid profilo-details"
                />
              </Col>
              <Col xs={8}>
                <Row className="justify-content-end">
                  <Col xs={3}>
                    {" "}
                    <Dropdown className="d-flex justify-content-end">
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
                            variant="outline-quaternario"
                            className="mb-2 border-0 border-bottom border-quaternario border-3"
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                          <Button
                            variant="outline-quaternario"
                            className=" border-0 border-top mb-2 border-bottom border-quaternario border-3"
                            onClick={() => setModificaModale(true)}
                          >
                            Modifica
                          </Button>
                          <Button
                            variant="outline-danger"
                            className=" border-0 border-top border-quaternario border-3"
                            onClick={() => setEliminaModale(true)}
                          >
                            Elimina account
                          </Button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <div className="d-flex justify-content-center">
                  <p className="display-6 fw-bold text-bianco ">
                    {profile?.nome} {profile?.cognome}
                  </p>
                </div>
                <p className="m-0 text-quaternario fw-bold">Email:</p>
                <p className="text-white-50">{profile?.email}</p>
                <p className="m-0 text-quaternario fw-bold">Username:</p>
                <p className="text-white-50">{profile?.username}</p>
              </Col>
            </Row>
            <hr className="border-3 opacity-none border-quaternario mb-0" />
            <Tabs
              defaultActiveKey="il tuo gruppo"
              id="fill-tab-example"
              className="mb-3 border-0"
              fill
            >
              <Tab eventKey="il tuo gruppo" title="il tuo gruppo">
                <TuoGruppo mioGruppo={profile?.gruppo} />
              </Tab>
              <Tab eventKey="i Tuoi Post" title="i Tuoi Post">
                <TuoiPost />
              </Tab>
              <Tab
                eventKey="Videogiochi Preferiti"
                title="Videogiochi Preferiti"
                className=" bg-secondario p-3 mt-5 rounded-4 shadow"
              >
                {spinnerPreferiti ? (
                  <div className="d-flex justify-content-center my-5">
                    <Spinner animation="grow" variant="quaternario" />
                  </div>
                ) : (
                  <>
                    <div>
                      <GrigliaVideogiochi
                        listaRisultati={videogiochiPreferiti}
                      />
                    </div>
                  </>
                )}
                {videogiochiPreferiti.length === 0 && !spinnerPreferiti && (
                  <p className="text-center display-6 mt-5 fw-bold text-bianco">
                    non hai alcun videogioco tra i preferiti
                  </p>
                )}
                {videogiochiPreferiti.length > 0 && !spinnerPreferiti && (
                  <Row className="justify-content-center mt-4 mb-5">
                    <Col xs={6} sm={4} lg={2} className="d-flex">
                      {!isFirstPreferitiPage && (
                        <Button
                          variant="outline-quaternario"
                          onClick={() =>
                            setPaginaPreferiti(paginaPreferiti - 1)
                          }
                          className="me-4 flex-fill"
                          href="#"
                        >
                          Precedente
                        </Button>
                      )}
                    </Col>
                    <Col xs={6} sm={4} lg={2} className="d-flex">
                      {!isLastPreferitiPage && (
                        <Button
                          variant="outline-quaternario "
                          onClick={() =>
                            setPaginaPreferiti(paginaPreferiti + 1)
                          }
                          className="flex-fill"
                          href="#"
                        >
                          Successiva
                        </Button>
                      )}
                    </Col>
                  </Row>
                )}
              </Tab>
              {(profile?.ruolo === "ADMIN" ||
                profile?.ruolo === "GAME_CREATOR") && (
                <Tab
                  eventKey="Videogiochi aggiunti"
                  title="Videogiochi aggiunti"
                  className=" bg-secondario p-3 mt-5 rounded-4 shadow"
                >
                  {spinner ? (
                    <div className="d-flex justify-content-center my-5">
                      <Spinner animation="grow" variant="quaternario" />
                    </div>
                  ) : (
                    <>
                      <div>
                        <GrigliaVideogiochi
                          listaRisultati={videogiochi?.content}
                        />
                      </div>
                    </>
                  )}

                  {videogiochi !== null && !spinner && (
                    <Row className="justify-content-center mt-4 mb-5">
                      <Col xs={6} sm={4} lg={2} className="d-flex">
                        {!videogiochi?.first && (
                          <Button
                            variant="outline-quaternario"
                            onClick={() => setPagina(pagina - 1)}
                            className="me-4 flex-fill"
                            href="#"
                          >
                            Precedente
                          </Button>
                        )}
                      </Col>
                      <Col xs={6} sm={4} lg={2} className="d-flex">
                        {!videogiochi?.last && (
                          <Button
                            variant="outline-quaternario "
                            onClick={() => setPagina(pagina + 1)}
                            className="flex-fill"
                            href="#"
                          >
                            Successiva
                          </Button>
                        )}
                      </Col>
                    </Row>
                  )}
                  {videogiochi?.content.length === 0 && !spinner && (
                    <p className="text-center display-6 mt-0 fw-bold text-bianco">
                      Nessun videogioco aggiunto
                    </p>
                  )}
                </Tab>
              )}
              <Tab eventKey="gruppi creati" title="gruppi creati">
                {spinnerGruppi ? (
                  <div className="d-flex justify-content-center mt-5">
                    <Spinner animation="grow" variant="quaternario" />
                  </div>
                ) : (
                  <>
                    <GrigliaGruppi listaRisultati={gruppi?.content} />
                  </>
                )}
                {gruppi?.content.length < 1 && !spinnerGruppi && (
                  <p className="text-center display-6 mt-5 fw-bold text-bianco">
                    Nessun gruppo creato
                  </p>
                )}
                {gruppi !== null && !spinnerGruppi && (
                  <Row className="justify-content-center mt-4 mb-5">
                    <Col xs={6} sm={4} lg={2} className="d-flex">
                      {!gruppi?.first && (
                        <Button
                          variant="outline-quaternario"
                          onClick={() => setPaginaGruppi(pagina - 1)}
                          className="me-4 flex-fill"
                          href="#"
                        >
                          Precedente
                        </Button>
                      )}
                    </Col>
                    <Col xs={6} sm={4} lg={2} className="d-flex">
                      {!gruppi?.last && (
                        <Button
                          variant="outline-quaternario "
                          onClick={() => setPaginaGruppi(pagina + 1)}
                          className="flex-fill"
                          href="#"
                        >
                          Successiva
                        </Button>
                      )}
                    </Col>
                  </Row>
                )}
              </Tab>
            </Tabs>
          </>
        ) : (
          <div className="mt-5">
            <NoAccessContent />
          </div>
        )}
      </Container>
      {eliminaModale && (
        <Modal
          size="md"
          show={eliminaModale}
          onHide={() => setEliminaModale(false)}
          aria-labelledby="example-modal-sizes-title-sm"
          className="text-bianco"
        >
          <Modal.Header closeButton className="bg-secondario">
            <Modal.Title id="example-modal-sizes-title-sm">
              Elimina Account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-secondario d-flex flex-column align-items-center">
            <p className="text-center">Sicuro di voler eliminare l'account?</p>
            <div>
              <Button
                variant="danger"
                size="sm"
                className="ms-4"
                onClick={() => {
                  handleEliminaAccountClick();
                }}
              >
                Elimina
              </Button>
              <Button
                variant="outline-quaternario"
                size="sm"
                className="ms-4"
                onClick={() => setEliminaModale(false)}
              >
                Chiudi
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {eliminaSuccess && (
        <ModalSuccessAction
          text={"Account eliminato con successo"}
          show={eliminaSuccess}
        />
      )}

      {modificaModale && (
        <ModalModificaAccount
          show={modificaModale}
          onHide={() => setModificaModale(false)}
        />
      )}
    </>
  );
};
export default MyAccount;
