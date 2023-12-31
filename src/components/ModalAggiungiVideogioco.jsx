import { useEffect } from "react";
import { useState } from "react";
import { Badge, Button, Form, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModalSuccessAction from "./ModalSuccessAction";

const ModalAggiungiVideogioco = (props) => {
  let profile = useSelector((state) => state.profilo.me);
  const [validated, setValidated] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [modificaSuccess, setModificaSuccess] = useState(false);
  const [erroreCreazione, setErroreCreazione] = useState("");
  const [erroreModifica, setErroreModifica] = useState("");

  // generi da scegliere
  const [generiPresenti, setGeneriPresenti] = useState([]);
  const [generiDaMostrare, setGeneriDaMostrare] = useState([]);
  // piattaforme da scegliere
  const [piattaformePresenti, setPiattaformePresenti] = useState([
    "PC",
    "PLAYSTATION",
    "SWITCH",
    "XBOX",
    "MOBILE",
  ]);
  const [piattaformeDaMostrare, setPiattaformeDaMostrare] = useState([
    "PC",
    "PLAYSTATION",
    "SWITCH",
    "XBOX",
    "MOBILE",
  ]);

  // body
  const [nomeVideogioco, setNomeVideogioco] = useState("");
  const [copertina, setCopertina] = useState("");
  const [descrizione, setDescrizione] = useState("");

  const [aziendaProprietaria, setAziendaProprietaria] = useState("");
  const [videoTrailer, setVideoTrailer] = useState("");
  const [dataRilascio, setDataRilascio] = useState("");

  // lista di generi scelti
  const [allGeneri, setAllGeneri] = useState([]);
  const [genere, setGenere] = useState("");

  // lista di piattaforme scelte
  const [allPiattaforme, setAllPiattaforme] = useState([]);
  const [piattaforme, setPiattaforme] = useState("");

  //  opzione per cercare da array di generi
  const [genereRicercato, setGenereRicercato] = useState("");
  const [erroreGenere, setErroreGenere] = useState(false);

  //  opzione per cercare da array di piattaforme
  const [piattaformaRicercato, setPiattaformaicercato] = useState("");
  const [errorePiattaforma, setErrorePiattaforma] = useState(false);

  // fetch generi
  useEffect(() => {
    generiFetch();
  }, []);

  //fetch generi
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
        let generi = [];
        dato.forEach((gen) => {
          generi = [...generi, gen.nome];
        });

        setGeneriPresenti(generi);

        setGeneriDaMostrare([]);
        let genMostr = generi.slice(0, 10);

        setGeneriDaMostrare(genMostr);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //fetch crea/modifica videogioco

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (
      nomeVideogioco !== "" &&
      copertina !== "" &&
      descrizione !== "" &&
      aziendaProprietaria !== "" &&
      videoTrailer !== "" &&
      dataRilascio !== "" &&
      allGeneri.length > 0 &&
      allPiattaforme.length > 0
    ) {
      console.log(allGeneri.length > 0);
      console.log(allPiattaforme);
      setErroreCreazione("");
      setErroreModifica("");
      if (props.videogioco === undefined) {
        const URL = "http://localhost:3001/videogioco";
        const headers = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            nome: nomeVideogioco,
            copertina: copertina,
            descrizione: descrizione,
            generi: allGeneri,
            piattaforme: allPiattaforme,
            aziendaProprietaria: aziendaProprietaria,
            responsabileId: profile.id,
            videoTrailer: videoTrailer,
            dataRilascio: dataRilascio,
          }),
        };
        try {
          let risposta = await fetch(URL, headers);
          if (risposta.ok) {
            let dato = await risposta.json();
            setCreateSuccess(true);
            setErroreCreazione("");
            setTimeout(() => {
              setCreateSuccess(false);
              props.onHide();
            }, 1500);
          } else {
            let dato = await risposta.json();
            setErroreCreazione(dato.message);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const URL = "http://localhost:3001/videogioco/" + props.videogioco.id;
        const headers = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            nome: nomeVideogioco,
            copertina: copertina,
            descrizione: descrizione,
            generi: allGeneri,
            piattaforme: allPiattaforme,
            aziendaProprietaria: aziendaProprietaria,
            responsabileId: profile.id,
            videoTrailer: videoTrailer,
            dataRilascio: dataRilascio,
          }),
        };
        try {
          let risposta = await fetch(URL, headers);
          if (risposta.ok) {
            let dato = await risposta.json();
            setModificaSuccess(true);
            setErroreModifica("");
            setTimeout(() => {
              setModificaSuccess(false);
              props.fetch();
              props.onHide();
            }, 1500);
          } else {
            let dato = await risposta.json();
            setErroreModifica(dato.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if (props.videogioco === undefined) {
        setErroreCreazione("Compilare tutti i campi");
      } else {
        setErroreModifica("Compilare tutti i campi");
      }
    }
  };

  //selezione per generi

  useEffect(() => {
    const result = generiPresenti?.filter((gen) =>
      gen.toLowerCase().includes(genereRicercato.toLowerCase())
    );
    if (genereRicercato !== "") {
      setGeneriDaMostrare(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genereRicercato]);

  const handleInputChange = () => {
    // Aggiungi il valore agli elementi selezionati solo se non è già presente
    if (allGeneri.length <= 6) {
      setErroreGenere(false);
      if (!allGeneri.includes(genere)) {
        setAllGeneri([...allGeneri, genere]);
        let newArrayGeneri = generiPresenti.filter(
          (item) => item.toLowerCase() !== genere.toLowerCase()
        );
        let newArrayGeneriDamostrare = generiDaMostrare.filter(
          (item) => item.toLowerCase() !== genere.toLowerCase()
        );
        setGeneriDaMostrare(newArrayGeneriDamostrare);
        setGeneriPresenti(newArrayGeneri);
        setGenere("");
      } else {
        setGenere("");
      }
    } else {
      setGenere("");
      setErroreGenere(true);
    }
  };
  const handleRemoveItem = (item) => {
    setAllGeneri(allGeneri.filter((i) => i !== item));
    setGeneriPresenti([...generiPresenti, item]);
    setGeneriDaMostrare([...generiDaMostrare, item]);
  };

  // selezione per piattaforme
  useEffect(() => {
    const result = piattaformePresenti?.filter((piat) =>
      piat.toLowerCase().includes(piattaformaRicercato.toLowerCase())
    );
    if (piattaformaRicercato !== "") {
      setPiattaformeDaMostrare(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [piattaformaRicercato]);

  const handleInputChangePiattaforma = () => {
    // Aggiungi il valore agli elementi selezionati solo se non è già presente
    if (
      piattaforme.toUpperCase() === "PC" ||
      piattaforme.toUpperCase() === "PLAYSTATION" ||
      piattaforme.toUpperCase() === "SWITCH" ||
      piattaforme.toUpperCase() === "XBOX" ||
      piattaforme.toUpperCase() === "MOBILE"
    ) {
      setErrorePiattaforma(false);
      if (!allPiattaforme.includes(piattaforme)) {
        setAllPiattaforme([...allPiattaforme, piattaforme]);
        let newArrayPiattaforme = piattaformePresenti.filter(
          (item) => item.toLowerCase() !== piattaforme.toLowerCase()
        );
        let newArrayPiattaformeDamostrare = piattaformeDaMostrare.filter(
          (item) => item.toLowerCase() !== piattaforme.toLowerCase()
        );
        setPiattaformeDaMostrare(newArrayPiattaformeDamostrare);
        setPiattaformePresenti(newArrayPiattaforme);
        setPiattaforme("");
      } else {
        setPiattaforme("");
      }
    } else {
      setPiattaformeDaMostrare(allPiattaforme);
      setErrorePiattaforma(true);
      setPiattaforme("");
    }
  };
  const handleRemoveItemPiattaforma = (item) => {
    setAllPiattaforme(allPiattaforme.filter((i) => i !== item));
    setPiattaformePresenti([...piattaformePresenti, item]);
    setPiattaformeDaMostrare([...piattaformeDaMostrare, item]);
  };
  //use effect per impostare i valori alla modifica

  useEffect(() => {
    if (props.videogioco !== undefined) {
      setNomeVideogioco(props.videogioco.nome);
      setCopertina(props.videogioco.copertina);
      setDescrizione(props.videogioco.descrizione);
      setAziendaProprietaria(props.videogioco.aziendaProprietaria);
      setVideoTrailer(props.videogioco.videoTrailer);
      setDataRilascio(props.videogioco.dataRilascio);

      props.videogioco.piattaforme.forEach((piattaforma) => {
        let p = [];

        for (const piat of props.videogioco.piattaforme) {
          let piattaforma = piat;
          p = [...p, piattaforma];
        }

        setAllPiattaforme(p);
      });

      if (props.videogioco.generi.length > 0) {
        let g = [];

        for (const gener of props.videogioco.generi) {
          let generevid = gener.nome;
          g = [...g, generevid];
        }

        setAllGeneri(g);
      }
    }
  }, [props]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-bianco"
      >
        <Modal.Header className="bg-secondario border-quaternario" closeButton>
          <p
            id="contained-modal-title-vcenter"
            className="flex-fill m-0 text-center logo-no-nav h2 fw-bold"
          >
            Aggiungi il tuo Videogioco
          </p>
        </Modal.Header>
        <Modal.Body className="bg-secondario body-creaVideogioco">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="Videogioco">
              <Form.Label>Nome del Videogioco</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome videogioco"
                value={nomeVideogioco}
                onChange={(e) => setNomeVideogioco(e.target.value)}
                className="input-per-modali"
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il nome del videogioco!
              </Form.Control.Feedback>
            </Form.Group>
            {/* ############################ selezione generi */}
            <div>
              <p className="mb-1">Generi </p>
            </div>
            {/* Input di testo per generi */}
            {allGeneri.map((item, index) => (
              <Badge
                key={index}
                bg="quaternario"
                className="mb-2 me-2"
                onClick={() => handleRemoveItem(item)}
              >
                {item} <span className="ml-1 pointer">&#x2715;</span>{" "}
              </Badge>
            ))}{" "}
            <div className="d-flex ">
              {" "}
              <Form.Control
                type="text"
                value={genere}
                onChange={(e) => {
                  setGenereRicercato(e.target.value);
                  setGenere(e.target.value);
                }}
                placeholder="Digita o scegli da uno a 7 generi"
                className="input-per-modali"
              />{" "}
              <Button
                type="button"
                variant="quaternario"
                onClick={handleInputChange}
              >
                Aggiungi
              </Button>
            </div>
            <Row className="my-4 ms-2">
              {generiDaMostrare?.map((gen) => (
                <div
                  className="pointer genere-trovato mb-2 p-0"
                  onClick={() => {
                    setGenereRicercato(gen);
                    setGenere(gen);
                  }}
                >
                  <p className="pointer p-2 m-0 me-2 bg-success rounded-3 genere-trovato">
                    {gen}{" "}
                  </p>
                </div>
              ))}
              {erroreGenere && (
                <p className="text-center">numero massimo generi raggiunto</p>
              )}
            </Row>
            {/* ############################ fine selezione generi */}
            {/* ############################ selezione piattaforme */}
            <div>
              <p className="mb-1">Piattaforme </p>
            </div>
            {allPiattaforme.map((item, index) => (
              <Badge
                key={index}
                bg="quaternario"
                className="mb-2 me-2"
                onClick={() => handleRemoveItemPiattaforma(item)}
              >
                {item} <span className="ml-1 pointer">&#x2715;</span>{" "}
              </Badge>
            ))}{" "}
            <div className="d-flex ">
              {" "}
              <Form.Control
                type="text"
                value={piattaforme}
                onChange={(e) => {
                  setPiattaformaicercato(e.target.value);
                  setPiattaforme(e.target.value);
                }}
                placeholder="Digita o scegli le piattaforme"
                className="input-per-modali"
              />{" "}
              <Button
                type="button"
                variant="quaternario"
                onClick={handleInputChangePiattaforma}
              >
                Aggiungi
              </Button>
            </div>
            <Row className="my-4 ms-2">
              {piattaformeDaMostrare?.map((piat) => (
                <div
                  className="pointer genere-trovato mb-2 p-0"
                  onClick={() => {
                    setPiattaformaicercato(piat);
                    setPiattaforme(piat);
                  }}
                >
                  <p className="pointer p-2 m-0 me-2 bg-success rounded-3 genere-trovato">
                    {piat}{" "}
                  </p>
                </div>
              ))}
              {errorePiattaforma && (
                <p className="text-center">
                  devi inserire un elemento tra quelli elencati
                </p>
              )}
            </Row>
            {/* ############################ fine selezione piattaforme */}
            <Form.Group className="mb-3" controlId="copertina">
              <Form.Label>
                Immagine di copertina {"(MAX 6000 caratteri)"}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="https://esempioImmagine.com"
                value={copertina}
                onChange={(e) => setCopertina(e.target.value)}
                className="input-per-modali"
                maxLength={6000}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci l'immagine di copertina!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Descrizione">
              <Form.Label>Descrizione {"(MAX 1000 caratteri)"}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Inserisci la descrizione del videogioco"
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
                className="input-per-texArea"
                maxLength={1000}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci la descrizione del videogioco!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="azienda">
              <Form.Label>Nome dell'azienda proprietaria </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il nome dell'azienda proprietaria"
                value={aziendaProprietaria}
                onChange={(e) => setAziendaProprietaria(e.target.value)}
                className="input-per-modali"
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il nome dell'azienda proprietaria!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Video">
              <Form.Label>Video trailer </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il link del video trailer"
                value={videoTrailer}
                onChange={(e) => setVideoTrailer(e.target.value)}
                className="input-per-modali"
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il link del video trailer!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Data">
              <Form.Label>Data lancio ufficiale </Form.Label>
              <Form.Control
                type="date"
                value={dataRilascio}
                onChange={(e) => setDataRilascio(e.target.value)}
                className="input-per-modali"
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci la data del lancio ufficiale!
              </Form.Control.Feedback>
            </Form.Group>
            {erroreCreazione !== "" && (
              <p className="text-danger mt-3">{erroreCreazione}</p>
            )}
            {erroreModifica !== "" && (
              <p className="text-danger mt-3">{erroreModifica}</p>
            )}
            <div className=" d-flex justify-content-evenly">
              <Button variant="success" type="submit">
                {props.videogioco !== undefined ? "Modifica" : "Crea"}
              </Button>
              <Button variant="outline-quaternario" onClick={props.onHide}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {createSuccess && (
        <ModalSuccessAction
          text={"Videogioco creato con successo"}
          show={createSuccess}
        />
      )}
      {modificaSuccess && (
        <ModalSuccessAction
          text={"Videogioco modificato con successo"}
          show={modificaSuccess}
        />
      )}
    </>
  );
};
export default ModalAggiungiVideogioco;
