import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MembriGruppo = ({ idGruppo }) => {
  const navigate = useNavigate();
  const [membri, setMembri] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    gruppoMembriFetch();
  }, [pagina]);

  const gruppoMembriFetch = async () => {
    setSpinner(true);
    const URL =
      "http://localhost:3001/utente?idGruppo=" + idGruppo + "&page=" + pagina;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        setMembri(dato);
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
    <Container>
      {membri !== null &&
        !spinner &&
        membri?.content?.length > 0 &&
        membri?.content.map((utente) => (
          <>
            <Row
              key={utente?.id}
              className="justify-content-center mb-3 pointer"
              onClick={() => navigate("/profilo/" + utente.id)}
            >
              <Col
                xs={3}
                sm={2}
                lg={1}
                className=" bg-secondario d-flex justify-content-end align-items-center"
              >
                <img
                  className="immagine-pagginaGruppo pointer"
                  alt={utente?.nome + " " + utente?.cognome}
                  src={utente?.immagineProfilo}
                />
              </Col>
              <Col
                xs={9}
                sm={6}
                lg={4}
                className="bg-secondario d-flex justify-content-start p-3"
              >
                {" "}
                <div>
                  <p className="text-bianco fw-bold m-0 text-truncate">
                    {utente?.nome} {utente?.cognome}
                  </p>
                  <small className="text-white-50 m-0 text-truncate">
                    {utente?.email}
                  </small>
                </div>
                <div className="flex-grow-1 d-flex flex-column align-items-center">
                  <p className="text-bianco fw-bold m-0 text-truncate">
                    Username:
                  </p>
                  <p className="text-white-50 m-0 text-truncate">
                    {utente?.username}
                  </p>
                </div>
              </Col>
            </Row>
          </>
        ))}{" "}
      {membri !== null && !spinner && membri?.content?.length === 0 && (
        <p className="text-center fw-bold h3 text-bianco mt-5">
          NON CI SONO MEMBRI ATTUALMENTE
        </p>
      )}{" "}
      {spinner && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="grow" variant="quaternario" />
        </div>
      )}
      {membri !== null && (
        <Row className="justify-content-center mt-4">
          <Col xs={6} sm={4} lg={2} className="d-flex">
            {!membri?.first && (
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
            {!membri?.last && (
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
    </Container>
  );
};
export default MembriGruppo;
