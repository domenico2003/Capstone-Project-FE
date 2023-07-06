import { Button, Container, Form } from "react-bootstrap";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container className="text-bianco  pt-5">
      <div className="bg-secondario w-25 shadow-sm mx-auto p-4 mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="quaternario" type="submit">
            Accedi
          </Button>
        </Form>
      </div>
    </Container>
  );
};
export default Login;
