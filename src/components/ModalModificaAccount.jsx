import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { profileFetch } from "../redux/actions";
import ModalSuccessAction from "./ModalSuccessAction";
import { useEffect } from "react";
const ModalModificaAccount = (props) => {
  let profile = useSelector((state) => state.profilo.me);
  let dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [modificaSuccess, setModificaSuccess] = useState(false);

  const [emailInserita, setEmailInserita] = useState("");
  const [immagineInserita, setImmagineInserita] = useState("");
  const [usernameInserito, setUsernameInserito] = useState("");
  const [nomeInserito, setNomeInserito] = useState("");
  const [cognomeInserito, setCognomeInserito] = useState("");

  useEffect(() => {
    setEmailInserita(profile?.email);
    setImmagineInserita(profile?.immagineProfilo);
    setUsernameInserito(profile?.username);
    setNomeInserito(profile?.nome);
    setCognomeInserito(profile?.cognome);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (
      emailInserita !== "" &&
      immagineInserita !== "" &&
      usernameInserito !== "" &&
      nomeInserito !== "" &&
      cognomeInserito !== ""
    ) {
      const URL = "http://localhost:3001/utente/" + profile?.id;
      const headers = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          username: usernameInserito,
          email: emailInserita,
          nome: nomeInserito,
          cognome: cognomeInserito,
          immagineProfilo: immagineInserita,
        }),
      };
      try {
        let risposta = await fetch(URL, headers);
        if (risposta.ok) {
          let dato = await risposta.json();
          setModificaSuccess(true);
          setTimeout(() => {
            setModificaSuccess(false);
            dispatch(profileFetch());
            props.onHide();
          }, 1500);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="border-quaternario "
      >
        <Modal.Header
          closeButton
          className="bg-secondario text-bianco border-quaternario"
        >
          <p
            id="contained-modal-title-vcenter"
            className="flex-fill m-0 text-center logo-no-nav h2 fw-bold"
          >
            Modifica Account
          </p>
        </Modal.Header>
        <Modal.Body className="bg-secondario text-bianco ">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="input-per-modali"
                type="email"
                placeholder="Email"
                value={emailInserita}
                onChange={(e) => setEmailInserita(e.target.value)}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                inserisci un'email valida!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                Inserisci immagine profilo {"(MAX: 6000 caratteri)"}
              </Form.Label>
              <Form.Control
                className="input-per-modali"
                type="text"
                placeholder="https://esempioImmagine.com"
                value={immagineInserita}
                onChange={(e) => setImmagineInserita(e.target.value)}
                max={6000}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci l'immagine profilo!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                className="input-per-modali"
                type="text"
                placeholder="Nome"
                value={nomeInserito}
                onChange={(e) => setNomeInserito(e.target.value)}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il tuo nome!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCognome">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                className="input-per-modali"
                type="text"
                placeholder="Cognome"
                value={cognomeInserito}
                onChange={(e) => setCognomeInserito(e.target.value)}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il tuo cognome!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="input-per-modali"
                type="text"
                placeholder="Username"
                value={usernameInserito}
                onChange={(e) => setUsernameInserito(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il tuo username!
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex mt-5 justify-content-around ">
              <Button type="submit" variant="quaternario">
                modifica
              </Button>
              <Button
                variant="outline-quaternario"
                type="button"
                onClick={props.onHide}
              >
                chiudi
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {modificaSuccess && (
        <ModalSuccessAction
          text={"Account modificato con successo"}
          show={modificaSuccess}
        />
      )}
    </>
  );
};
export default ModalModificaAccount;
