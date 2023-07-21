import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import SingolaRecensione from "./SingolaRecensione";
import ModalRecensioni from "./ModalRecensioni";

const Recensioni = ({ videogioco, fetchvid }) => {
  let profile = useSelector((state) => state.profilo.me);

  const [recensioni, setRecensioni] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [recensioneModale, setRecensioneModale] = useState(false);
  useEffect(() => {
    if (videogioco !== null) {
      recensioniFetch();
    }
  }, [pagina]);
  useEffect(() => {
    if (videogioco !== null) {
      recensioniFetch();
    }
  }, [videogioco]);
  const recensioniFetch = async () => {
    setSpinner(true);
    const URL =
      "http://localhost:3001/recensione?giocoId=" +
      videogioco.id +
      "&page=" +
      pagina;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        setRecensioni(dato);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSpinner(false);
      }, 1500);
    }
  };
  return (
    <>
      <Row xs={1} md={2} className="justify-content-center ">
        <Col xs={10} md={6} className="bg-secondario mt-5 p-4">
          <div className="mb-4 bg-terziario p-4 shadow">
            <p className="h5 " id="h5">
              Scrivi una recensione!
            </p>
            <div
              onClick={() => {
                setRecensioneModale(true);
              }}
            >
              <Form.Control
                placeholder="scrivi una recensione"
                disabled
                className=" pointer input-per-post bg-primario "
              />
            </div>
          </div>
          {spinner ? (
            <div className="d-flex justify-content-center mt-5">
              <Spinner animation="grow" variant="quaternario" />
            </div>
          ) : (
            <>
              <p className="h4 text-center text-bianco fw-bold">
                Tutte le recensioni:
              </p>
              <hr className="border my-3  border-2 border-quaternario opacity-100" />
              {recensioni?.content.map((recensione) => (
                <SingolaRecensione
                  recensione={recensione}
                  giocoid={videogioco?.id}
                  recensionefetch={() => recensioniFetch()}
                  fetchvid={() => fetchvid()}
                />
              ))}
            </>
          )}
          {recensioni?.content.length < 1 && !spinner && (
            <p className="text-center display-6 mt-5 fw-bold text-bianco">
              nessuna recensione presente
            </p>
          )}
          {recensioni !== null && !spinner && (
            <Row className="justify-content-center mt-4 mb-5">
              <Col xs={6} sm={4} lg={2} className="d-flex">
                {!recensioni?.first && (
                  <Button
                    variant="outline-quaternario"
                    onClick={() => setPagina(pagina - 1)}
                    className="me-4 flex-fill"
                  >
                    Precedente
                  </Button>
                )}
              </Col>
              <Col xs={6} sm={4} lg={2} className="d-flex">
                {!recensioni?.last && (
                  <Button
                    variant="outline-quaternario "
                    onClick={() => setPagina(pagina + 1)}
                    className="flex-fill"
                  >
                    Successiva
                  </Button>
                )}
              </Col>
            </Row>
          )}
        </Col>
        <Col className="d-none d-md-block"></Col>
      </Row>
      {recensioneModale && (
        <ModalRecensioni
          show={recensioneModale}
          onHide={() => setRecensioneModale(false)}
          recensionifetch={() => recensioniFetch()}
          giocoId={videogioco?.id}
          fetchvid={() => fetchvid()}
        />
      )}
    </>
  );
};

export default Recensioni;
