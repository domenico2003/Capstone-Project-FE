import { Button, Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarVideogioco from "./StarVideogioco";
import { useState } from "react";
import ModalRecensioni from "./ModalRecensioni";
import ModalSuccessAction from "./ModalSuccessAction";
const SingolaRecensione = ({ recensione, recensionefetch, giocoid }) => {
  let profile = useSelector((state) => state.profilo.me);
  const [recensioneModale, setRecensioneModale] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [rimuoviRecensione, setRimuoviRecensione] = useState(false);
  const navigate = useNavigate();
  const handleEliminaRecensioneClick = async () => {
    const URL = "http://localhost:3001/recensione/" + recensione?.id;
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
          recensionefetch();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container fluid>
        <Row className=" mb-3 bg-primario">
          <Col
            xs={2}
            sm={2}
            className="d-flex p-3 px-0 align-items-center justify-content-center pointer border-end border-quaternario border-3 "
            onClick={() => navigate("/profilo/" + recensione?.utente?.id)}
          >
            <img
              className="immagine-nav "
              src={recensione?.utente?.immagineProfilo}
              alt={recensione?.utente?.nome + " " + recensione?.utente?.cognome}
            />
          </Col>
          <Col xs={10} sm={10} className="py-3">
            <div className="d-flex align-items-center justify-content-between">
              <p className="m-0 text-bianco fw-bold ">
                {recensione?.utente?.username}
              </p>
              {recensione?.utente?.id === profile?.id && (
                <Dropdown className="d-flex justify-content-end">
                  <Dropdown.Toggle
                    drop={"down-centered"}
                    className={`text-white-50  border-0 clicked`}
                    id="dropdown-basic"
                  >
                    <BsThreeDots className="h5 m-0" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-primario border-2 border-quaternario p-0 ">
                    <div className="d-flex flex-column w-100 ">
                      <Button
                        variant="outline-danger"
                        className="mb-2 border-0 border-bottom border-danger border-3"
                        onClick={() => setRimuoviRecensione(true)}
                      >
                        Elimina
                      </Button>
                      <Button
                        variant="outline-quaternario"
                        className=" border-0 border-top border-quaternario border-3"
                        onClick={() => setRecensioneModale(true)}
                      >
                        Modifica
                      </Button>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>

            <div>
              <p className="m-0">
                {
                  <StarVideogioco
                    valutazioneRecensione={recensione?.valutazione}
                    className="m-0 h4 text-quaternario"
                  />
                }
              </p>
              <p className="m-0  text-white-50 fw-bold text-break">
                {recensione?.descrizione}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      {recensioneModale && (
        <ModalRecensioni
          show={recensioneModale}
          onHide={() => setRecensioneModale(false)}
          recensionifetch={recensionefetch}
          recensione={recensione}
          giocoId={giocoid}
        />
      )}
      {rimuoviRecensione && (
        <Modal
          size="md"
          show={rimuoviRecensione}
          onHide={() => setRimuoviRecensione(false)}
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
                  handleEliminaRecensioneClick();
                  setRimuoviRecensione(false);
                }}
              >
                Elimina
              </Button>
              <Button
                variant="outline-quaternario"
                size="sm"
                className="ms-4"
                onClick={() => setRimuoviRecensione(false)}
              >
                Chiudi
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {deleteSuccess && (
        <ModalSuccessAction
          text={"recensione eliminata con successo"}
          show={deleteSuccess}
        />
      )}
    </>
  );
};
export default SingolaRecensione;
