import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import NoAccessContent from "./NoAccessContent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GrigliaVideogiochi from "./GrigliaVideogiochi";
import ModalAggiungiVideogioco from "./ModalAggiungiVideogioco";

const Videogiochi = () => {
  let profile = useSelector((state) => state.profilo.me);

  const [videogiochi, setVideogiochi] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [onSelectClick, setOnSelectClick] = useState(false);
  const [Generi, setGeneri] = useState([]);

  const [aggiungiVideogioco, setAggiungiVideogioco] = useState(false);
  //filtri

  const [dataDa, setDataDa] = useState("");
  const [dataA, setDataA] = useState("");
  const [valutazioneMedia, setValutazioneMedia] = useState(
    "--Seleziona opzione--"
  );
  const [nomeAzienda, setNomeAzienda] = useState("");
  const [nomeVideogioco, setNomeVideogioco] = useState("");
  const [genereInpostato, setGenereImpostato] = useState(
    "--Seleziona opzione--"
  );

  const componiUrl = () => {
    let url = "";

    if (valutazioneMedia !== "--Seleziona opzione--") {
      url += `&valutazioneMedia=${valutazioneMedia}`;
    }
    if (dataDa !== "" && dataA !== "") {
      url += `&dataRilacioDa=${dataDa}&dataRilacioA=${dataA}`;
    }
    if (dataDa !== "" && dataA === "") {
      url += `&dataRilacioDa=${dataDa}`;
    }
    if (nomeAzienda !== "") {
      url += `&aziendaProprietaria=${nomeAzienda}`;
    }
    if (nomeVideogioco !== "") {
      url += `&nome=${nomeVideogioco}`;
    }
    if (genereInpostato !== "--Seleziona opzione--") {
      url += `&genere=${genereInpostato}`;
    }

    return url;
  };
  const handleRicercaSubmit = () => {
    let url = componiUrl();
    videogiochiFetch(url);
  };

  useEffect(() => {
    videogiochiFetch();
  }, [pagina]);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      generiFetch();
    }
  }, []);

  const videogiochiFetch = async (customUrl) => {
    setSpinner(true);
    const URL =
      "http://localhost:3001/videogioco/all?size=20&page=" +
      pagina +
      (customUrl !== undefined ? customUrl : "");
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
  const generiFetch = async () => {
    const URL = "http://localhost:3001/videogioco/generi";
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        setGeneri(dato);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="mt-5 ">
      {localStorage.getItem("token") != null ? (
        <Row className="justify-content-center container-page rounded-4 shadow">
          <Col
            xs={10}
            md={3}
            className="bg-terziario colonna-di-ricerca text-bianco rounded-start-4 pb-3 pb-md-0"
          >
            <p className=" text-center text-white  mt-3">
              {profile?.ruolo !== "USER" && (
                <>
                  <span className="fw-bold text-quaternario text-decoration-underline">
                    Aggiungi
                  </span>
                  <span>{" o "}</span>
                </>
              )}
              <span>Filtra</span> videogiochi :
            </p>
            <hr className="border my-3  border-2 border-quaternario opacity-100" />
            <Form.Group className="mb-3">
              <Form.Label>Nome Videogioco</Form.Label>
              <Form.Control
                type="text"
                value={nomeVideogioco}
                onChange={(e) => setNomeVideogioco(e.target.value)}
                placeholder="Nome Videogioco"
                className="input-per-modali"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome Azienda proprietaria</Form.Label>
              <Form.Control
                type="text"
                value={nomeAzienda}
                onChange={(e) => setNomeAzienda(e.target.value)}
                placeholder="Nome azienda"
                className="input-per-modali"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Genere</Form.Label>
              <Form.Select
                className="input-per-modali "
                onClick={() => setOnSelectClick(!onSelectClick)}
              >
                <option className="d-none">{genereInpostato}</option>
              </Form.Select>
              {onSelectClick && (
                <div className="options-select mt-2">
                  {" "}
                  <span
                    onClick={() => {
                      setGenereImpostato("--Seleziona opzione--");
                      setOnSelectClick(false);
                    }}
                  >
                    --Seleziona opzione--
                  </span>
                  {Generi?.map((genere, index) => (
                    <span
                      key={"indexOf" + genere.id + index}
                      onClick={() => {
                        setGenereImpostato(genere?.nome);
                        setOnSelectClick(false);
                      }}
                    >
                      {genere?.nome}
                    </span>
                  ))}
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>valutazione media{"(da N in su)"}</Form.Label>
              <Form.Select
                className="input-per-modali"
                value={valutazioneMedia}
                onChange={(e) => setValutazioneMedia(e.target.value)}
              >
                <option>--Seleziona opzione--</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Select>
            </Form.Group>
            <p className="form-label"> Data rilascio</p>
            <Row xs={2} md={1} xl={2}>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="text-quaternario fw-bold">
                    Da
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={dataDa}
                    onChange={(e) => setDataDa(e.target.value)}
                    placeholder="da data"
                    className="input-per-modali"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>a</Form.Label>
                  <Form.Control
                    type="date"
                    value={dataA}
                    onChange={(e) => setDataA(e.target.value)}
                    placeholder="a data"
                    className="input-per-modali"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={3} md={4} xl={3}>
                <Button
                  href="#"
                  variant="quaternario"
                  onClick={() => handleRicercaSubmit()}
                >
                  Cerca
                </Button>
              </Col>
              {profile?.ruolo !== "USER" && (
                <Col
                  xs={9}
                  md={12}
                  xl={9}
                  className="d-flex flex-column mt-md-2 mt-xl-0 align-items-stretch"
                >
                  <Button
                    variant="outline-quaternario "
                    onClick={() => setAggiungiVideogioco(true)}
                  >
                    Aggiungi videogioco
                  </Button>
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={11} md={9} className="bg-secondario rounded-end-4 ">
            {spinner ? (
              <div className="d-flex justify-content-center mt-5">
                <Spinner animation="grow" variant="quaternario" />
              </div>
            ) : (
              <>
                <p className="display-4 text-center text-bianco fw-bold">
                  videogiochi
                </p>
                <hr className="border my-3  border-2 border-quaternario opacity-100" />
                <GrigliaVideogiochi listaRisultati={videogiochi?.content} />
              </>
            )}
            {videogiochi?.content.length < 1 && !spinner && (
              <p className="text-center display-6 mt-5 fw-bold text-bianco">
                nessun risultato, riprova
              </p>
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
          </Col>
        </Row>
      ) : (
        <div className="mt-5">
          <NoAccessContent />
        </div>
      )}

      {aggiungiVideogioco && (
        <ModalAggiungiVideogioco
          show={aggiungiVideogioco}
          onHide={() => setAggiungiVideogioco(false)}
        />
      )}
    </Container>
  );
};
export default Videogiochi;
