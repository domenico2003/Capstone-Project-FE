import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import GrigliaGruppi from "./GrigliaGruppi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ModalGruppo from "./ModalGruppo";

const RicercaGruppi = () => {
  let profile = useSelector((state) => state.profilo.me);

  const [gruppi, setGruppi] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [onSelectClick, setOnSelectClick] = useState(false);
  const [argomenti, setArgomenti] = useState([]);

  const [aggiungiGruppo, setAggiungiGruppo] = useState(false);
  //filtri

  const [dataCreazioneDa, setDataCreazioneDa] = useState("");
  const [dataCreazioneA, setDataCreazioneA] = useState("");

  const [nomeGruppo, setNomeGruppo] = useState("");
  const [argomentoInpostato, setArgomentoImpostato] = useState(
    "--Seleziona opzione--"
  );

  const componiUrl = () => {
    let url = "";

    if (dataCreazioneDa !== "" && dataCreazioneA !== "") {
      url += `&da=${dataCreazioneDa}&a=${dataCreazioneA}`;
    }
    if (dataCreazioneDa !== "" && dataCreazioneA === "") {
      url += `&da=${dataCreazioneDa}`;
    }

    if (nomeGruppo !== "") {
      url += `&nome=${nomeGruppo}`;
    }
    if (argomentoInpostato !== "--Seleziona opzione--") {
      url += `&argomento=${argomentoInpostato}`;
    }

    return url;
  };
  const handleRicercaSubmit = () => {
    console.log(dataCreazioneDa);
    let url = componiUrl();
    gruppiFetch(url);
  };
  useEffect(() => {
    gruppiFetch();
  }, [pagina]);

  useEffect(() => {
    argomentiFetch();
  }, []);

  const gruppiFetch = async (customUrl) => {
    setSpinner(true);
    const URL =
      "http://localhost:3001/gruppo?size=20&page=" +
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

        setGruppi(dato);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSpinner(false);
      }, 1500);
    }
  };
  const argomentiFetch = async () => {
    const URL = "http://localhost:3001/gruppo/argomenti";
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        setArgomenti(dato);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Row className="justify-content-center">
        <Col
          xs={10}
          md={3}
          className="bg-terziario colonna-di-ricerca text-bianco rounded-start-4 pb-3 pb-md-0"
        >
          <p className=" text-center text-white  mt-3">Crea un Gruppo :</p>

          <div className="d-flex flex-column align-items-stretch">
            <Button
              variant="outline-quaternario "
              onClick={() => setAggiungiGruppo(true)}
            >
              Crea Gruppo
            </Button>
          </div>
          <hr className="border my-3  border-2 border-quaternario opacity-100" />
          <p className=" text-center text-white  mt-3">
            Oppure cercane uno a cui unirti :
          </p>
          <hr className="border my-3  border-2 border-quaternario opacity-100" />
          <Form.Group className="mb-3">
            <Form.Label>Nome Gruppo</Form.Label>
            <Form.Control
              type="text"
              value={nomeGruppo}
              onChange={(e) => setNomeGruppo(e.target.value)}
              placeholder="Nome Gruppo"
              className="input-per-modali"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Argomento</Form.Label>
            <Form.Select
              className="input-per-modali "
              onClick={() => setOnSelectClick(!onSelectClick)}
            >
              <option className="d-none">{argomentoInpostato}</option>
            </Form.Select>
            {onSelectClick && (
              <div className="options-select mt-2">
                {" "}
                <span
                  onClick={() => {
                    setArgomentoImpostato("--Seleziona opzione--");
                    setOnSelectClick(false);
                  }}
                >
                  --Seleziona opzione--
                </span>
                {argomenti?.map((argomento, index) => (
                  <span
                    key={"indexOf" + argomento.id + index}
                    onClick={() => {
                      setArgomentoImpostato(argomento?.nome);
                      setOnSelectClick(false);
                    }}
                  >
                    {argomento?.nome}
                  </span>
                ))}
              </div>
            )}
          </Form.Group>

          <p className="form-label"> Data creazione</p>
          <Row xs={2} md={1} xl={2}>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="text-quaternario fw-bold">Da</Form.Label>
                <Form.Control
                  type="date"
                  value={dataCreazioneDa}
                  onChange={(e) => setDataCreazioneDa(e.target.value)}
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
                  value={dataCreazioneA}
                  onChange={(e) => setDataCreazioneA(e.target.value)}
                  placeholder="a data"
                  className="input-per-modali"
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            href="#"
            variant="quaternario"
            onClick={() => handleRicercaSubmit()}
          >
            Cerca
          </Button>
        </Col>
        <Col xs={11} md={9} className="bg-secondario rounded-end-4 ">
          {spinner ? (
            <div className="d-flex justify-content-center mt-5">
              <Spinner animation="grow" variant="quaternario" />
            </div>
          ) : (
            <>
              <GrigliaGruppi listaRisultati={gruppi?.content} />
            </>
          )}
          {gruppi?.content.length < 1 && !spinner && (
            <p className="text-center display-6 mt-5 fw-bold text-bianco">
              nessun risultato, riprova
            </p>
          )}
          {gruppi !== null && !spinner && (
            <Row className="justify-content-center mt-4 mb-5">
              <Col xs={6} sm={4} lg={2} className="d-flex">
                {!gruppi?.first && (
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
                {!gruppi?.last && (
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
      {aggiungiGruppo && (
        <ModalGruppo
          show={aggiungiGruppo}
          onHide={() => setAggiungiGruppo(false)}
        />
      )}
    </>
  );
};
export default RicercaGruppi;
