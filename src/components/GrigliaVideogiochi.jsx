import { Row } from "react-bootstrap";

import CardVideogioco from "./CardVideogioco";

const GrigliaVideogiochi = ({ listaRisultati }) => {
  return (
    <Row className="justify-content-center justify-content-sm-start ">
      {listaRisultati?.map((videogioco) => (
        <CardVideogioco key={videogioco?.id} videogioco={videogioco} />
      ))}
    </Row>
  );
};
export default GrigliaVideogiochi;
