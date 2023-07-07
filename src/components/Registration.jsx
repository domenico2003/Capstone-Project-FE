import { useState } from "react";
import { Button, Col, Container, Row, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [spinnerStatus, setSpinnerStatus] = useState(false);
  const [emailInserita, setEmailInserita] = useState("");
  const [passwordInserita, setPasswordInserita] = useState("");
  const [usernameInserito, setUsernameInserito] = useState("");
  const [nomeInserito, setNomeInserito] = useState("");
  const [cognomeInserito, setCognomeInserito] = useState("");
  const [validated, setValidated] = useState(false);
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
      passwordInserita !== "" &&
      usernameInserito !== "" &&
      nomeInserito !== "" &&
      cognomeInserito !== ""
    ) {
      setSpinnerStatus(true);
      const URL = "http://localhost:3001/auth/register";
      const headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameInserito,
          email: emailInserita,
          password: passwordInserita,
          nome: nomeInserito,
          cognome: cognomeInserito,
        }),
      };
      try {
        let risposta = await fetch(URL, headers);
        if (risposta.ok) {
          let dato = await risposta.json();
          localStorage.setItem("token", dato.token);
          handleRegistred();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRegistred = async () => {
    const URL = "http://localhost:3001/auth/login";
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInserita,
        password: passwordInserita,
      }),
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        localStorage.setItem("token", dato.token);

        setTimeout(() => {
          navigate("/");
        }, 2500);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSpinnerStatus(false);
      }, 2500);
    }
  };
  return (
    <Container className="text-bianco mt-3 pt-5">
      <Row className="justify-content-center ">
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={4}
          className="bg-secondario p-4 "
        >
          <p className="h1 logo fw-bold text-bianco">Registrati</p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={passwordInserita}
                onChange={(e) => setPasswordInserita(e.target.value)}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci la password!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
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

            <Row className="justify-content-between">
              <Col xs={3} sm={4}>
                <Button variant="quaternario" type="submit">
                  Registrati
                </Button>
              </Col>
              <Col
                xs={9}
                sm={8}
                className="d-flex justify-content-end align-items-center"
              >
                <small className="fs-7 ">
                  sei già registrato?{" "}
                  <Link to={"/login"} className="text-decoration-none">
                    accedi ora
                  </Link>
                </small>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {spinnerStatus && (
        <div className="position-fixed top-0 start-0 bottom-0 end-0 spinnerBackground d-flex justify-content-center align-items-center">
          <Spinner animation="grow" variant="quaternario" />
        </div>
      )}
    </Container>
  );
};
export default Registration;
