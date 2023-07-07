import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [emailInserita, setEmailInserita] = useState("");
  const [passwordInserita, setPasswordInserita] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    if (emailInserita !== "" && passwordInserita !== "") {
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
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container className="text-bianco login pt-5">
      <Row className="justify-content-center ">
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={4}
          className="bg-secondario p-4 login"
        >
          <p className="h1 logo fw-bold text-bianco">Accedi</p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={emailInserita}
                onChange={(e) => setEmailInserita(e.target.value)}
                required
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
                required
              />
              <Form.Control.Feedback type="invalid">
                Inserisci la password!
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="justify-content-between">
              <Col xs={3} sm={4}>
                <Button variant="quaternario" type="submit">
                  Accedi
                </Button>
              </Col>
              <Col
                xs={9}
                sm={8}
                className="d-flex justify-content-end align-items-center"
              >
                <small className="fs-7 ">
                  non sei ancora registrato?{" "}
                  <Link to={"/registration"} className="text-decoration-none">
                    registrati ora
                  </Link>
                </small>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
