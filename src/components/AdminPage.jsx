import { Button, Col, Container, Form, Row } from "react-bootstrap";
import NoAccessContent from "./NoAccessContent";
import { useState } from "react";
import ModalSuccessAction from "./ModalSuccessAction";

const AdminPage = () => {
  const [emailAdmin, setEmailAdmin] = useState("");
  const [emailGameCreator, setEmailGameCreator] = useState("");
  const [errorAdmin, setErrorAdmin] = useState("");
  const [successAdmin, setSuccessAdmin] = useState(false);
  const [errorGameCreator, setErrorGameCreator] = useState("");
  const [successGameCreator, setSuccessGameCreator] = useState(false);
  const aggiungiAdmin = async () => {
    const URL =
      "http://localhost:3001/admin/setRuoli?emailUtente=" +
      emailAdmin +
      "&admin=true";
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
        setErrorAdmin();
        setSuccessAdmin(true);

        setTimeout(() => {
          setSuccessAdmin(false);
          setEmailAdmin("");
        }, 2000);
      } else {
        let dato = await risposta.json();
        setErrorAdmin(dato.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const aggiungiGameCreator = async () => {
    const URL =
      "http://localhost:3001/admin/setRuoli?emailUtente=" +
      emailGameCreator +
      "&gameCreator=true";
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
        setErrorGameCreator("");
        setSuccessGameCreator(true);

        setTimeout(() => {
          setSuccessGameCreator(false);
          setEmailGameCreator("");
        }, 2000);
      } else {
        let dato = await risposta.json();
        setErrorGameCreator(dato.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="mt-5 text-bianco">
      {localStorage.getItem("token") === null ? (
        <div className="mt-5">
          <NoAccessContent />
        </div>
      ) : (
        <>
          <p className="fw-bold text-center logo-no-nav display-6">
            Questa pagina è riservata agli Admin
          </p>
          <div className="d-flex justify-content-center ">
            <p className="w-50 text-center text-white-50">
              Come{" "}
              <span className="fw-bold text-quaternario text-decoration-underline">
                ADMIN
              </span>{" "}
              tu potrai nominare altri{" "}
              <span className="fw-bold text-quaternario text-decoration-underline">
                {" "}
                admin o game creator
              </span>
              , assegnare{" "}
              <span className="fw-bold text-quaternario text-decoration-underline">
                responsabili
              </span>{" "}
              hai videogiochi e{" "}
              <span className="fw-bold text-quaternario text-decoration-underline">
                fondatori
              </span>{" "}
              ai gruppi.{" "}
            </p>
          </div>
          <div className="d-flex justify-content-center ">
            <p className="w-50 text-center text-white-50">
              Nomina{" "}
              <span className="fw-bold text-quaternario text-decoration-underline">
                ADMIN
              </span>{" "}
              o{" "}
              <span className="fw-bold text-quaternario text-decoration-underline">
                GAME CREATOR
              </span>{" "}
              direttamente da questa pagina o
              <span className="fw-bold text-quaternario text-decoration-underline">
                responsabili e fondatori
              </span>{" "}
              dalle pagine di dettaglio di videogiochi e gruppi
            </p>
          </div>
          <hr className="border-3 opacity-none border-quaternario mb-0" />
          <Row className="justify-content-center mt-5">
            <Col
              xs={10}
              sm={8}
              md={6}
              className="d-flex flex-column align-items-center "
            >
              <p className="fw-bold h4">
                Aggiungi{" "}
                <span className="logo-no-nav h4 fw-bold"> GAME CREATOR</span>
              </p>
              <Form.Label className="text-center">
                Inserisci email utente da promuovere
              </Form.Label>
              <Form.Control
                className="input-per-modali w-custom-2"
                value={emailGameCreator}
                onChange={(e) => setEmailGameCreator(e.target.value)}
                type="text"
                placeholder="Email utente da promuovere"
              />
              <Button
                variant="outline-quaternario"
                className="mt-2"
                onClick={() => aggiungiGameCreator()}
              >
                Aggiungi
              </Button>
              {errorGameCreator !== "" && (
                <p className="text-center text-danger">{errorGameCreator}</p>
              )}
            </Col>
            <Col xs={10} className="d-md-none my-3">
              <hr className="border-3 opacity-none border-quaternario mb-0" />
            </Col>
            <Col
              xs={10}
              sm={8}
              md={6}
              className="d-flex flex-column align-items-center"
            >
              <p className="fw-bold h4">
                Aggiungi <span className="logo-no-nav h4 fw-bold"> ADMIN</span>
              </p>
              <Form.Label className="text-center">
                Inserisci email utente da promuovere
              </Form.Label>
              <Form.Control
                className="input-per-modali w-custom-2"
                value={emailAdmin}
                onChange={(e) => setEmailAdmin(e.target.value)}
                type="text"
                placeholder="Email utente da promuovere"
              />
              <Button
                variant="outline-quaternario"
                className="mt-2"
                onClick={() => aggiungiAdmin()}
              >
                Aggiungi
              </Button>

              {errorAdmin !== "" && (
                <p className="text-center text-danger">{errorAdmin}</p>
              )}
            </Col>
          </Row>
        </>
      )}{" "}
      {successAdmin && (
        <ModalSuccessAction
          text={emailAdmin + " è diventato ADMIN"}
          show={successAdmin}
        />
      )}
      {successGameCreator && (
        <ModalSuccessAction
          text={emailGameCreator + " è diventato GAME CREATOR"}
          show={successGameCreator}
        />
      )}
    </Container>
  );
};
export default AdminPage;
