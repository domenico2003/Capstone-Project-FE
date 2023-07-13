import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SinglePost from "./SinglePost";

const TuoiPost = ({ utente }) => {
  let profile = useSelector((state) => state.profilo.me);

  const [Post, setPost] = useState(null);
  const [profilo, setProfilo] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [spinner, setSpinner] = useState(false);

  const location = useLocation();

  useEffect(() => {
    utentePostFetch();
  }, [pagina]);

  useEffect(() => {
    if (location.pathname === "/me") {
      setProfilo(profile);
    } else {
      setProfilo(utente);
    }
  }, [utente]);

  const utentePostFetch = async () => {
    setSpinner(true);
    const URL =
      "http://localhost:3001/post?userId=" + profile?.id + "&page=" + pagina;
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
        {/* faccio vedere il contenuto */}
        {Post !== null &&
          !spinner &&
          Post?.content?.length > 0 &&
          Post?.content.map((post, indice) => (
            <>
              <SinglePost
                key={indice + "/postPerUtente"}
                post={post}
                gruppopostfetch={utentePostFetch}
              />
            </>
          ))}
      </div>
      {/* spinner durante i caricamenti */}
      {spinner && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="grow" variant="quaternario" />
        </div>
      )}
      {/* tasti per andare avanti o indietro con i contenuti */}
      {Post !== null && !spinner && (
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
      {/* messaggio in caso non abbiamo publicato alcun post  */}
      {Post !== null && !spinner && Post?.content?.length === 0 && (
        <p className="text-center fw-bold h3 text-bianco mt-5">
          NON HAI PUBLICATO ANCORA NIENTE!
        </p>
      )}{" "}
    </Container>
  );
};
export default TuoiPost;
