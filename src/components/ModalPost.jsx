import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModalSuccessAction from "./ModalSuccessAction";

const ModalPost = (props) => {
  let profile = useSelector((state) => state.profilo.me);
  const [testo, setTesto] = useState("");
  const [img, setImg] = useState("");
  const [validated, setValidated] = useState(false);
  const [modificaSuccess, setModificaSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  useEffect(() => {
    if (props.post !== undefined) {
      setTesto(props.post?.contenuto);
      setImg(props.post?.immagine);
    }
  }, [props]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (testo !== "" && testo !== null) {
      if (props.post === undefined) {
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

            setCreateSuccess(true);

            setTimeout(() => {
              setCreateSuccess(false);
              props.onHide();
              props.gruppopostfetch();
            }, 1500);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const URL = "http://localhost:3001/post/" + props.post?.id;
        const headers = {
          method: "PUT",
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

            setModificaSuccess(true);

            setTimeout(() => {
              setModificaSuccess(false);
              props.onHide();
              props.gruppopostfetch();
            }, 1500);
          }
        } catch (error) {
          console.log(error);
        }
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
            {props.post !== undefined ? "Modifica post" : "Aggiungi post"}
          </p>
        </Modal.Header>
        <Modal.Body className="bg-secondario text-bianco ">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Di cosa vuoi parlare?{"(MAX: 1000 caratteri)"}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className="input-per-texArea"
                placeholder="Inserisci il contenuto del tuo post "
                value={testo}
                onChange={(e) => setTesto(e.target.value)}
                required
                maxLength={1000}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Inserisci un immagine {"(MAX: 600 caratteri)"}
              </Form.Label>
              <Form.Control
                type="text"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="indirizzo dell'immagine Es: https://esempioImmagine.img "
                className="input-per-modali "
                maxLength={600}
              />
            </Form.Group>

            <div className="d-flex mt-5 justify-content-around ">
              <Button type="submit" variant="quaternario">
                {props.post !== undefined ? "modifica" : "Publica"}
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
      {modificaSuccess && (
        <ModalSuccessAction
          text={"Post modificato con successo"}
          show={modificaSuccess}
        />
      )}

      {createSuccess && (
        <ModalSuccessAction
          text={"Post creato con successo"}
          show={createSuccess}
        />
      )}
    </>
  );
};
export default ModalPost;
