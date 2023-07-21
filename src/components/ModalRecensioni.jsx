import { useState } from "react";
import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";

import { useSelector } from "react-redux";
import ModalSuccessAction from "./ModalSuccessAction";
const ModalRecensioni = (props) => {
  let profile = useSelector((state) => state.profilo.me);

  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(-1);
  const [descrizione, setDescrizione] = useState("");
  const [validated, setValidated] = useState(false);
  const [modificaSuccess, setModificaSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [erroreModifica, setErroreModifica] = useState("");
  const [erroreCreate, setErroreCreate] = useState("");

  useEffect(() => {
    if (props.recensione !== undefined) {
      setRating(props.recensione?.valutazione);
      setDescrizione(props.recensione?.descrizione);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (rating !== -1 && descrizione !== "") {
      setErroreModifica("");
      setErroreCreate("");
      if (props.recensione !== undefined) {
        const URL = "http://localhost:3001/recensione/" + props.recensione?.id;
        const headers = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            utenteId: profile?.id,
            giocoId: props.giocoId,
            valutazione: rating,
            descrizione: descrizione,
          }),
        };
        try {
          let risposta = await fetch(URL, headers);
          if (risposta.ok) {
            let dato = await risposta.json();
            setErroreModifica("");

            setModificaSuccess(true);

            setTimeout(() => {
              setModificaSuccess(false);
              props.onHide();
              props.recensionifetch();
            }, 1500);
          } else {
            let dato = await risposta.json();
            setErroreModifica(dato.message);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const URL = "http://localhost:3001/recensione";
        const headers = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            utenteId: profile?.id,
            giocoId: props.giocoId,
            valutazione: rating,
            descrizione: descrizione,
          }),
        };
        try {
          let risposta = await fetch(URL, headers);
          if (risposta.ok) {
            let dato = await risposta.json();

            setErroreCreate("");
            setCreateSuccess(true);

            setTimeout(() => {
              setCreateSuccess(false);
              props.onHide();
              props.recensionifetch();
            }, 1500);
          } else {
            let dato = await risposta.json();
            setErroreCreate(dato.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if (props.recensione !== undefined) {
        setErroreModifica("Compila tutti i campi");
      } else {
        setErroreCreate("Compila tutti i campi");
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
            {props.recensione !== undefined
              ? "Modifica recensione"
              : "Aggiungi recensione"}
          </p>
        </Modal.Header>
        <Modal.Body className="bg-secondario text-bianco ">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {" "}
            <Form.Label className="h6 fw-normal">
              Inserisci valutazione
            </Form.Label>
            <div className="mb-2">
              {[...Array(5)].map((star, index) => {
                let ratingValue = index + 1;

                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />
                    <AiFillStar
                      className=" pointer "
                      color={
                        ratingValue <= (hover || rating) ? "#5e2962" : "#ececec"
                      }
                      size={30}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Motiva la tua recensione{"(MAX: 1000 caratteri)"}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className="input-per-texArea"
                placeholder="Inserisci il motivo della tua recensione "
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
                required
                maxLength={1000}
              />
            </Form.Group>
            {erroreCreate !== "" && (
              <p className="text-danger mt-3">{erroreCreate}</p>
            )}
            {erroreModifica !== "" && (
              <p className="text-danger mt-3">{erroreModifica}</p>
            )}
            <div className="d-flex mt-5 justify-content-around ">
              <Button type="submit" variant="quaternario">
                {props.recensione !== undefined ? "modifica" : "Publica"}
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
          text={"recensione modificata con successo"}
          show={modificaSuccess}
        />
      )}

      {createSuccess && (
        <ModalSuccessAction
          text={"recensione creato con successo"}
          show={createSuccess}
        />
      )}
    </>
  );
};
export default ModalRecensioni;
