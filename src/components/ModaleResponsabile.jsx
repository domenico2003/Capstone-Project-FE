import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ModaleResponsabile = (props) => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (email !== "") {
      if (props.giocoId !== undefined) {
        const URL =
          "http://localhost:3001/admin/" + email + "?giocoId=" + props.giocoId;
        const headers = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          let risposta = await fetch(URL, headers);
          if (risposta.ok) {
            let dato = await risposta.json();
            setError("");
            props.fetch();
            props.onHide();
          } else {
            let dato = await risposta.json();
            setError(dato.message);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const URL =
          "http://localhost:3001/admin/" +
          email +
          "?gruppoId=" +
          props.gruppoId;
        const headers = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          let risposta = await fetch(URL, headers);

          if (risposta.ok) {
            let dato = await risposta.json();
            setError("");
            props.fetch();
            props.onHide();
          } else {
            let dato = await risposta.json();
            setError(dato.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <>
      {" "}
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
            Aggiungi{" "}
            {props.giocoId !== undefined ? "responsabile" : "fondatore"}
          </p>
        </Modal.Header>
        <Modal.Body className="bg-secondario text-bianco ">
          <Form validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Inserisci l'email del nuovo responsabile</Form.Label>
              <Form.Control
                type="email"
                className="input-per-modali"
                placeholder="Inserisci il motivo della tua recensione "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            {error !== "" && <p className="text-danger">{error}</p>}
            <div className="d-flex mt-5 justify-content-around ">
              <Button type="submit" variant="quaternario">
                Aggiungi
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
    </>
  );
};
export default ModaleResponsabile;
