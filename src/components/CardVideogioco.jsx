import { Card, Col } from "react-bootstrap";
import StarVideogioco from "./StarVideogioco";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CardVideogioco = ({ videogioco }) => {
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
      onClick={() => navigate("/videogiochi/" + videogioco?.id)}
    >
      <Card className="bg-primario shadow-sm text-bianco rounded-4 ">
        {(videogioco?.copertina !== "" || videogioco?.copertina !== null) && (
          <Card.Img
            variant="top"
            src={videogioco?.copertina}
            className="rounded-top-4 border-bottom border-5 border-quaternario"
          />
        )}

        <Card.Body className="p-0 d-flex flex-column justify-content-between">
          <div className={videogioco?.generi.length > 0 ? "px-2 py-2" : "p-3"}>
            <Card.Title className="text-truncate mb-0">
              {videogioco?.nome}
            </Card.Title>
            <StarVideogioco
              videogioco={videogioco}
              className={` ms-0  card-stars text-quaternario h5 ${
                hover ? "d-inline" : "d-none"
              }`}
            />
          </div>
          <div>
            <div className="px-3 py-1  border-top    border-2 border-quaternario opacity-75">
              <p className="m-0 text-bianco fw-bold">Rilasciato da: </p>
              <p className="m-0 text-white-50 text-truncate">
                {videogioco?.aziendaProprietaria}
              </p>
            </div>
            {videogioco?.generi.length > 0 && (
              <div className="px-3 py-1  border-top    border-2 border-quaternario opacity-75">
                <p className="m-0 text-bianco fw-bold">Generi: </p>
                <p className="m-0 text-white-50 text-truncate">
                  {videogioco?.generi.map((genere, index) => (
                    <span key={index + "genereVideogioco"}>
                      <span>{genere?.nome}</span>
                      {index < videogioco?.generi.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            )}
            <div className="px-3 py-1  border-top    border-2 border-quaternario opacity-75">
              <p className="m-0 text-bianco fw-bold">Disponibile su: </p>
              <p className="m-0 text-white-50 text-truncate">
                {videogioco?.piattaforme.map((piattaforma, index) => (
                  <span key={index + "piattaformaVideogioco"}>
                    {piattaforma}
                    {index < videogioco?.piattaforme.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default CardVideogioco;
