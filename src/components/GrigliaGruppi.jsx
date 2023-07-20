import { Row } from "react-bootstrap";
import CardGruppo from "./CardGruppo";

const GrigliaGruppi = ({ listaRisultati }) => {
  return (
    <Row className="justify-content-center mt-5 justify-content-sm-start ">
      {listaRisultati?.map((gruppo) => (
        <CardGruppo key={gruppo?.id} gruppo={gruppo} />
      ))}
    </Row>
  );
};
export default GrigliaGruppi;
