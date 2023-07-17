import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NoAccessContent = () => {
  const navigate = useNavigate();
  return (
    <>
      <p className="text-center m-0 fw-bold display-6 text-bianco">ACCEDI</p>
      <p className="text-bianco text-center">
        Ci dispiace, per visualizzare questo contenuto devi prima accedere!
      </p>
      <div className="d-flex justify-content-center align-items-center">
        <Button
          variant="outline-quaternario"
          onClick={() => navigate("/login")}
        >
          Accedi
        </Button>
        <span className="text-bianco mx-4">O</span>
        <Button
          variant="outline-quaternario"
          onClick={() => navigate("/registration")}
        >
          Registrati
        </Button>
      </div>
    </>
  );
};
export default NoAccessContent;
