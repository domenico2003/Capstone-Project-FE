import { useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CardGruppo = ({ gruppo }) => {
  const [hover, SetHover] = useState(false);
  const navigate = useNavigate();
  return (
    <Col
      xs={8}
      sm={6}
      lg={4}
      xxl={3}
      onMouseEnter={() => SetHover(true)}
      onMouseLeave={() => SetHover(false)}
      className="mb-4 pointer card-videogioco"
      onClick={() => navigate("/gruppi/" + gruppo?.id)}
    >
      <Card className="bg-primario shadow-sm text-bianco rounded-4 ">
        {(gruppo?.immagineGruppo !== "" || gruppo?.immagineGruppo !== null) && (
          <Card.Img
            variant="top"
            src={gruppo?.immagineGruppo}
            className="rounded-top-4 border-bottom border-5 border-quaternario"
          />
        )}

        <Card.Body className="p-0 d-flex flex-column justify-content-between">
          <div className={gruppo?.argomenti.length > 0 ? "px-2 py-2" : "p-3"}>
            <Card.Title className="text-truncate mb-0">
              {gruppo?.nome}
            </Card.Title>
          </div>
          <div>
            <div className="px-3 py-1  border-top    border-2 border-quaternario opacity-75">
              <p className="m-0 text-bianco fw-bold">Creato il: </p>
              <p className="m-0 text-white-50 text-truncate">
                {gruppo?.dataCreazione}
              </p>
            </div>
            {gruppo?.argomenti.length > 0 && (
              <div className="px-3 py-1  border-top    border-2 border-quaternario opacity-75">
                <p className="m-0 text-bianco fw-bold">Argomenti: </p>
                <p className="m-0 text-white-50 text-truncate">
                  {gruppo?.argomenti.map((argomento, index) => (
                    <span key={index + "genereVideogioco"}>
                      <span>{argomento?.nome}</span>
                      {index < gruppo?.argomenti.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            )}
            <div className="px-3 py-1  border-top    border-2 border-quaternario opacity-75">
              <p className="m-0 text-bianco fw-bold">Fondato da: </p>
              <p className="m-0 text-white-50 text-truncate">
                {gruppo?.fondatore !== null
                  ? gruppo?.fondatore?.username
                  : "Nessun fondatore presente"}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default CardGruppo;
