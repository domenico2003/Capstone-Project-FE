import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoAccessContent from "./NoAccessContent";
import RicercaGruppi from "./RicercaGruppi";

const GruppoPage = () => {
  let profile = useSelector((state) => state.profilo.me);

  return (
    <Container className="text-bianco mt-5">
      {localStorage.getItem("token") === null ? (
        <div className="mt-5">
          <NoAccessContent />
        </div>
      ) : (
        <>
          <div>
            <p className="text-center h1 logo-no-nav fw-bold">
              Non Fai parte di nessun gruppo
            </p>
            <p className="text-center text-white-50">
              entra a far parte di un gruppo per publicare le ciò che vuoi e
              trovare amici con cui giocare
            </p>
          </div>
          <hr className="border-3 opacity-none border-quaternario mb-0" />
          <p className="h2 text-center fw-bold shadow-text my-4 mb-5">
            Cerca o Crea un gruppo a cui unirti
          </p>

          <RicercaGruppi />
        </>
      )}
    </Container>
  );
};
export default GruppoPage;
