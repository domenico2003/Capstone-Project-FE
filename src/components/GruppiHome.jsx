import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GruppiHome = ({ gruppo, index }) => {
  const navigate = useNavigate();
  return (
    <>
      {index < 4 && (
        <Col
          xs={8}
          sm={5}
          xl={2}
          className="bg-secondario text-bianco groupHome my-2 p-3"
        >
          <Row
            className="pointer"
            onClick={() => navigate("/gruppi/" + gruppo?.id)}
          >
            <Col xs={4} className="d-flex align-items-center">
              {" "}
              <img
                className="immagineGruppoHome "
                alt={gruppo?.nome}
                src={gruppo?.immagineGruppo}
              />
            </Col>
            <Col xs={8}>
              <p className="m-0 text-truncate">{gruppo.nome}</p>
              <hr className="m-0 border-quaternario border-3 opacity-none" />
              <small className="m-0">Creato da:</small>
              <small className="d-block text-white-50">
                {gruppo?.fondatore?.username}
              </small>
            </Col>
          </Row>
        </Col>
      )}
    </>
  );
};
export default GruppiHome;
