import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModalSuccessAction from "./ModalSuccessAction";

const ModalModificaCommento = (props) => {
  let profile = useSelector((state) => state.profilo.me);
  const [commento, setCommento] = useState("");
  const [validated, setValidated] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    setCommento(props.commento?.testo);
  }, []);
  const lasciaCommentoFetch = async (e) => {
    e.preventDefault();

    if (commento !== "") {
      setValidated(true);
      setErrore("");
      const URL = "http://localhost:3001/commento/" + props.commento?.id;
      const headers = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          utenteId: profile?.id,
          postId: props.idPost,
          testo: commento,
        }),
      };

      try {
        let risposta = await fetch(URL, headers);
        if (risposta.ok) {
          let dato = await risposta.json();
          setErrore("");
          setShowSuccessModal(true);
          setCommento(dato.testo);
          setTimeout(() => {
            setShowSuccessModal(false);
            props.onHide();
            props.allCommentiFetch();
          }, 1500);
        } else {
          let dato = await risposta.json();
          setErrore(dato.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrore("inserisci il contenuto del commento");
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
            Modifica commento
          </p>
        </Modal.Header>
        <Modal.Body className="bg-secondario text-bianco ">
          <Form noValidate validated={validated} onSubmit={lasciaCommentoFetch}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Modifica Il commento</Form.Label>
              <Form.Control
                type="text"
                value={commento}
                onChange={(e) => setCommento(e.target.value)}
                placeholder="inserisci il testo"
                className="input-per-modali "
                maxLength={600}
                required
              />
            </Form.Group>
            {errore !== "" && <p className="text-danger mt-3">{errore}</p>}
            <div className="d-flex mt-5 justify-content-around ">
              <Button
                type="submit"
                variant="quaternario"
                onClick={() => props.resetCommenti()}
              >
                Modifica
              </Button>
              <Button
                variant="outline-quaternario"
                type="button"
                onClick={props.onHide}
              >
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {showSuccessModal && (
        <ModalSuccessAction
          text={"Commento modificato con successo"}
          show={showSuccessModal}
        />
      )}
    </>
  );
};
export default ModalModificaCommento;
