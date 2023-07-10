import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const VideogiocoHome = ({ videogioco, indice }) => {
  const navigate = useNavigate();
  const [stellePiene, setStellePiene] = useState([]);
  const [stelleVuote, setStelleVuote] = useState([]);

  useEffect(() => {
    let piene = [];
    let vuote = [];
    for (let index = 0; index < videogioco.valutazioneMedia; index++) {
      piene = [...piene, index + "fil"];
    }
    for (let index = 0; index < 5 - videogioco.valutazioneMedia; index++) {
      vuote = [...vuote, index + "notFil"];
    }
    setStellePiene(piene);
    setStelleVuote(vuote);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {indice === 0 || indice === 2 ? (
        <>
          <Row
            className="mb-5 text-bianco justify-content-center justify-content-md-start bg-secondario 
           translate-sx pointer
            "
            onClick={() => navigate("/videogiochi/" + videogioco?.id)}
          >
            <Col
              xs={8}
              lg={9}
              className="d-none d-md-flex flex-column align-items-end justify-content-between"
            >
              <div className="d-flex flex-column align-items-end">
                <p className="m-0 display-5 fw-bold  ">{videogioco?.nome}</p>
                <div className="my-3">
                  <span className="h4 me-2">
                    {videogioco?.valutazioneMedia}/5
                  </span>
                  <span>
                    {stellePiene.map((nStella) => (
                      <AiFillStar
                        className="text-quaternario h3"
                        key={nStella}
                      />
                    ))}
                    {stelleVuote.map((nStella) => (
                      <AiOutlineStar
                        className="text-quaternario h3"
                        key={nStella}
                      />
                    ))}
                  </span>
                </div>
                <p className="text-white-50">{videogioco?.descrizione}</p>
              </div>
              <div className="d-flex flex-column align-items-end mb-5">
                <div className="d-flex flex-column align-items-end">
                  <p className="m-0 fw-bold">Piattafore che lo supportano:</p>
                  <div>
                    {videogioco.piattaforme.map((piattaforma, index) => (
                      <span key={index + "piattaforma"}>
                        {piattaforma}
                        {index < videogioco.piattaforme.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="m-0 fw-bold">Data rilascio</p>
                  <p className="m-0 ">{videogioco.dataRilascio}</p>
                </div>
              </div>
            </Col>
            <Col
              xs={9}
              md={4}
              lg={3}
              className="d-flex justify-content-center img-container"
            >
              <img
                src={videogioco.copertina}
                alt={videogioco.nome}
                className="img-fluid"
              />
            </Col>
            <Col
              xs={9}
              className="d-flex d-md-none flex-column align-items- justify-content-between"
            >
              <div className="d-flex flex-column align-items-center">
                <p className="m-0 display-5 fw-bold  ">{videogioco?.nome}</p>
                <div className="my-3">
                  <span className="h4 me-2">
                    {videogioco?.valutazioneMedia}/5
                  </span>
                  <span>
                    {stellePiene.map((nStella) => (
                      <AiFillStar
                        className="text-quaternario h3"
                        key={nStella}
                      />
                    ))}
                    {stelleVuote.map((nStella) => (
                      <AiOutlineStar
                        className="text-quaternario h3"
                        key={nStella}
                      />
                    ))}
                  </span>
                </div>
                <p className="text-white-50">{videogioco?.descrizione}</p>
              </div>
              <div className="d-flex flex-column align-items-center mb-5">
                <div className="d-flex flex-column align-items-center">
                  <p className="m-0 fw-bold">Piattafore che lo supportano:</p>
                  <div>
                    {videogioco.piattaforme.map((piattaforma, index) => (
                      <span key={index + "piattaforma1"}>
                        {piattaforma}
                        {index < videogioco.piattaforme.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="m-0 fw-bold">Data rilascio</p>
                  <p className="m-0 ">{videogioco.dataRilascio}</p>
                </div>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row
            className="mb-5 text-bianco translate-dx justify-content-center justify-content-md-start bg-secondario pointer"
            onClick={() => navigate("/videogiochi/" + videogioco?.id)}
          >
            <Col
              xs={9}
              md={4}
              lg={3}
              className="d-flex justify-content-center img-container"
            >
              <img
                src={videogioco.copertina}
                alt={videogioco.nome}
                className="img-fluid"
              />
            </Col>
            <Col
              xs={8}
              lg={9}
              className="d-flex flex-column align-items-md-start align-items-center justify-content-between"
            >
              <div className="d-flex flex-column align-items-center align-items-md-start">
                <p className="m-0 display-5 fw-bold  ">{videogioco?.nome}</p>
                <div className="my-3">
                  <span>
                    {stellePiene.map((nStella) => (
                      <AiFillStar
                        className="text-quaternario h3"
                        key={nStella}
                      />
                    ))}
                    {stelleVuote.map((nStella) => (
                      <AiOutlineStar
                        className="text-quaternario h3"
                        key={nStella}
                      />
                    ))}
                  </span>
                  <span className="h4 ms-2">
                    {videogioco?.valutazioneMedia}/5
                  </span>
                </div>
                <p className="text-white-50">{videogioco?.descrizione}</p>
              </div>
              <div className="d-flex flex-column align-items-center  align-items-md-start mb-5">
                <div className="d-flex flex-column align-items-center align-items-md-start">
                  <p className="m-0 fw-bold">Piattafore che lo supportano:</p>
                  <div>
                    {videogioco.piattaforme.map((piattaforma, index) => (
                      <span key={index + "piattaforma2"}>
                        {piattaforma}
                        {index < videogioco.piattaforme.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="m-0 fw-bold">Data rilascio</p>
                  <p className="m-0 ">{videogioco.dataRilascio}</p>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default VideogiocoHome;
