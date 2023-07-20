import { useEffect } from "react";
import { useState } from "react";
import { Badge, Button, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ModalSuccessAction from "./ModalSuccessAction";
import { profileFetch } from "../redux/actions";
import { Navigate, useNavigate } from "react-router-dom";

const ModalGruppo = (props) => {
  let profile = useSelector((state) => state.profilo.me);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [modificaSuccess, setModificaSuccess] = useState(false);
  // argomenti da scegliere
  const [argomentiPresenti, setArgomentiPresenti] = useState([]);
  const [argomentiDaMostrare, setArgomentiDaMostrare] = useState([]);

  // body
  const [nomeGruppo, setNomeGruppo] = useState("");
  const [immagineGruppo, setImmagineGruppo] = useState("");
  const [descrizione, setDescrizione] = useState("");

  // lista di argomenti scelti
  const [allArgomenti, setAllArgomenti] = useState([]);
  const [argomento, setArgomento] = useState("");

  //  opzione per cercare da array di argomenti
  const [argomentoRicercato, setArgomentoRicercato] = useState("");
  const [erroreArgomento, setErroreArgomento] = useState(false);

  // fetch argomenti
  useEffect(() => {
    argomentiFetch();
  }, []);

  //fetch argomenti
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

        let argomenti = [];
        dato.forEach((arg) => {
          argomenti = [...argomenti, arg.nome];
        });

        setArgomentiPresenti(argomenti);

        setArgomentiDaMostrare([]);
        let argMostr = argomenti.slice(0, 10);

        setArgomentiDaMostrare(argMostr);
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
      (nomeGruppo !== "",
      immagineGruppo !== "",
      descrizione !== "",
      allArgomenti.length > 0)
    ) {
      if (props.gruppo === undefined) {
        const URL = "http://localhost:3001/gruppo";
        const headers = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            nome: nomeGruppo,
            immagineGruppo: immagineGruppo,
            descrizione: descrizione,
            argomenti: allArgomenti,
            fondatoreId: profile.id,
          }),
        };
        try {
          let risposta = await fetch(URL, headers);
          if (risposta.ok) {
            let dato = await risposta.json();
            setCreateSuccess(true);
            dispatch(profileFetch());
            setTimeout(() => {
              setCreateSuccess(false);
              navigate("/gruppi/" + dato.id);
              props.onHide();
            }, 1500);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const URL = "http://localhost:3001/gruppo/" + props.gruppo.id;
        const headers = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            nome: nomeGruppo,
            immagineGruppo: immagineGruppo,
            descrizione: descrizione,
            argomenti: allArgomenti,
            fondatoreId: profile.id,
          }),
        };
        try {
          let risposta = await fetch(URL, headers);
          if (risposta.ok) {
            let dato = await risposta.json();
            setModificaSuccess(true);

            setTimeout(() => {
              setModificaSuccess(false);
              props.fetch();
              props.onHide();
            }, 1500);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  //selezione per argomenti

  useEffect(() => {
    const result = argomentiPresenti?.filter((arg) =>
      arg.toLowerCase().includes(argomentoRicercato.toLowerCase())
    );
    if (argomentoRicercato !== "") {
      setArgomentiDaMostrare(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [argomentoRicercato]);

  const handleInputChange = () => {
    // Aggiungi il valore agli elementi selezionati solo se non è già presente
    if (allArgomenti.length <= 6) {
      setErroreArgomento(false);
      if (!allArgomenti.includes(argomento)) {
        setAllArgomenti([...allArgomenti, argomento]);
        let newArrayArgomenti = argomentiPresenti.filter(
          (item) => item.toLowerCase() !== argomento.toLowerCase()
        );
        let newArrayArgomentiDamostrare = argomentiDaMostrare.filter(
          (item) => item.toLowerCase() !== argomento.toLowerCase()
        );
        setArgomentiDaMostrare(newArrayArgomentiDamostrare);
        setArgomentiPresenti(newArrayArgomenti);
        setArgomento("");
      } else {
        setArgomento("");
      }
    } else {
      setArgomento("");
      setErroreArgomento(true);
    }
  };
  const handleRemoveItem = (item) => {
    setAllArgomenti(allArgomenti.filter((i) => i !== item));
    setArgomentiPresenti([...argomentiPresenti, item]);
    setArgomentiDaMostrare([...argomentiDaMostrare, item]);
  };

  //use effect per impostare i valori alla modifica

  useEffect(() => {
    if (props.gruppo !== undefined) {
      setNomeGruppo(props.gruppo.nome);
      setImmagineGruppo(props.gruppo.immagineGruppo);
      setDescrizione(props.gruppo.descrizione);

      if (props.gruppo.argomenti.length > 0) {
        let g = [];

        for (const argo of props.gruppo.argomenti) {
          let argomentGrup = argo.nome;
          g = [...g, argomentGrup];
        }

        setAllArgomenti(g);
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
            Crea il tuo gruppo
          </p>
        </Modal.Header>
        <Modal.Body className="bg-secondario body-creaVideogioco">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="gruppo">
              <Form.Label>Nome del gruppo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome gruppo"
                value={nomeGruppo}
                onChange={(e) => setNomeGruppo(e.target.value)}
                className="input-per-modali"
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il nome del gruppo!
              </Form.Control.Feedback>
            </Form.Group>
            {/* ############################ selezione argomenti */}
            <div>
              <p className="mb-1">argomenti </p>
            </div>
            {/* Input di testo per argomenti */}
            {allArgomenti.map((item, index) => (
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
                value={argomento}
                onChange={(e) => {
                  setArgomentoRicercato(e.target.value);
                  setArgomento(e.target.value);
                }}
                placeholder="Digita o scegli da uno a 7 argomenti"
                className="input-per-modali"
              />{" "}
              <Button
                type="button"
                variant="quaternario"
                onClick={handleInputChange}
              >
                Agggiungi
              </Button>
            </div>
            <Row className="my-4 ms-2">
              {argomentiDaMostrare?.map((arg) => (
                <div
                  className="pointer genere-trovato mb-2 p-0"
                  onClick={() => {
                    setArgomentoRicercato(arg);
                    setArgomento(arg);
                  }}
                >
                  <p className="pointer p-2 m-0 me-2 bg-success rounded-3 genere-trovato">
                    {arg}{" "}
                  </p>
                </div>
              ))}
              {erroreArgomento && (
                <p className="text-center">
                  numero massimo argomenti raggiunto
                </p>
              )}
            </Row>
            {/* ############################ fine selezione argomenti */}
            <Form.Group className="mb-3" controlId="immagineGruppo">
              <Form.Label>
                Immagine del gruppo {"(MAX 6000 caratteri)"}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="https://esempioImmagine.com"
                value={immagineGruppo}
                onChange={(e) => setImmagineGruppo(e.target.value)}
                className="input-per-modali"
                maxLength={6000}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci l'immagine del gruppo!
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
                Inserisci la descrizione del gruppo!
              </Form.Control.Feedback>
            </Form.Group>
            <div className=" d-flex justify-content-evenly">
              <Button variant="success" type="submit">
                {props.gruppo !== undefined ? "Modifica" : "Crea"}
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
          text={"Gruppo creato con successo"}
          show={createSuccess}
        />
      )}
      {modificaSuccess && (
        <ModalSuccessAction
          text={"Gruppo modificato con successo"}
          show={modificaSuccess}
        />
      )}
    </>
  );
};
export default ModalGruppo;
