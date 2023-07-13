import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const ModalPost = (props) => {
  let profile = useSelector((state) => state.profilo.me);
  const [testo, setTesto] = useState("");
  const [img, setImg] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (testo !== "") {
      const URL = "http://localhost:3001/post";
      const headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          contenuto: testo,
          gruppoId: props.idGruppo,
          utenteCheLoHaPublicatoId: profile.id,
          immagine: img,
        }),
      };
      try {
        let risposta = await fetch(URL, headers);
        if (risposta.ok) {
          let dato = await risposta.json();

          props.gruppopostfetch();
          props.onHide();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
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
          Aggiungi post
        </p>
      </Modal.Header>
      <Modal.Body className="bg-secondario text-bianco ">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Di cosa vuoi parlare?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="input-per-texArea"
              placeholder="Inserisci il contenuto del tuo post "
              value={testo}
              onChange={(e) => setTesto(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Inserisci un immagine</Form.Label>
            <Form.Control
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="indirizzo dell'immagine Es: https://esempioImmagine.img"
              className="input-per-modali "
            />
          </Form.Group>

          <div className="d-flex mt-5 justify-content-around ">
            <Button type="submit" variant="quaternario">
              Publica
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
  );
};
export default ModalPost;
