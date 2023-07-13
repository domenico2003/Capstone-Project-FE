import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SinglePost from "./SinglePost";
import ModalPost from "./ModalPost";

const Messaggistica = ({ idGruppo }) => {
  let profile = useSelector((state) => state.profilo.me);
  const navigate = useNavigate();
  const [Post, setPost] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [modalePost, setModalePost] = useState(false);

  useEffect(() => {
    gruppoPostFetch();
  }, [pagina]);

  const gruppoPostFetch = async () => {
    setSpinner(true);
    const URL =
      "http://localhost:3001/post?idGruppo=" + idGruppo + "&page=" + pagina;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        setPost(dato);
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
      <div className="d-flex flex-column align-items-center">
        {/* aggiungo post */}
        {!spinner && idGruppo === profile?.gruppo?.id && (
          <Col
            xs={11}
            md={9}
            xl={6}
            className="  p-4 mb-4 shadow bg-secondario border border-quaternario border-1"
          >
            <p className="text-center text-bianco m-0 h4">
              stai pensando a qualcosa? publicalo!
            </p>
            <hr className="border my-3  border-2 border-quaternario opacity-75" />
            <div
              onClick={() => {
                setModalePost(true);
              }}
            >
              <Form.Control
                placeholder="Publica un post"
                disabled
                className=" pointer input-per-post bg-primario"
              />
            </div>
          </Col>
        )}
        {!spinner && (
          <div className="d-flex align-items-center w-100 mb-4">
            <span className="text-white-50 me-2 mb-1"> post in evidenza</span>
            <hr className="border my-0  border-1 border-quaternario opacity-75 flex-fill" />
          </div>
        )}
        {/* faccio vedere il contenuto */}
        {Post !== null &&
          idGruppo === profile?.gruppo?.id &&
          !spinner &&
          Post?.content?.length > 0 &&
          Post?.content.map((post, indice) => (
            <>
              <SinglePost
                key={indice + "/postPerGruppo"}
                post={post}
                idGruppo={idGruppo}
                gruppopostfetch={gruppoPostFetch}
              />
            </>
          ))}
      </div>
      {/* se non è il mio gruppo dò un messaggio */}
      {idGruppo !== profile?.gruppo?.id && (
        <p className="text-center fw-bold h3 text-bianco mt-5">
          PER VISUALIZZARE I POST DEVI FAR PARTE DEL GRUPPO
        </p>
      )}
      {/* spinner durante i caricamenti */}
      {spinner && idGruppo === profile?.gruppo?.id && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="grow" variant="quaternario" />
        </div>
      )}
      {/* tasti per andare avanti o indietro con i contenuti */}
      {Post !== null && !spinner && idGruppo === profile?.gruppo?.id && (
        <Row className="justify-content-center mt-4">
          <Col xs={6} sm={4} lg={2} className="d-flex">
            {!Post?.first && (
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
            {!Post?.last && (
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
      {/* messaggio in caso non ci siano post  */}
      {Post !== null &&
        !spinner &&
        Post?.content?.length === 0 &&
        idGruppo === profile?.gruppo?.id && (
          <p className="text-center fw-bold h3 text-bianco mt-5">
            NON CI SONO POST ATTUALMENTE
          </p>
        )}{" "}
      {modalePost && (
        <ModalPost
          show={modalePost}
          onHide={() => setModalePost(false)}
          idGruppo={idGruppo}
          gruppopostfetch={() => gruppoPostFetch()}
        />
      )}
    </Container>
  );
};
export default Messaggistica;
