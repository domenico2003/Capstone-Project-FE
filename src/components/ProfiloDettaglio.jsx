import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import NoAccessContent from "./NoAccessContent";
import { useEffect, useState } from "react";
import TuoGruppo from "./TuoGruppo";
import TuoiPost from "./TuoiPost";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfiloDettaglio = () => {
  const params = useParams();
  const navigate = useNavigate();
  let account = useSelector((state) => state.profilo.me);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (account?.id === params.id) {
      navigate("/me");
    } else {
      profileFetch();
    }
  }, []);
  const profileFetch = async () => {
    const URL = "http://localhost:3001/utente/" + params.id;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        setProfile(dato);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container className="mt-5">
        {localStorage.getItem("token") === null ? (
          <div className="mt-5">
            <NoAccessContent />
          </div>
        ) : (
          <>
            <Row className="justify-content-center justify-content-md-start">
              <Col
                xs={12}
                md={4}
                className="d-flex justify-content-center d-md-block"
              >
                {" "}
                <img
                  src={profile?.immagineProfilo}
                  alt={profile?.nome}
                  className="img-fluid profilo-details"
                />
              </Col>
              <Col xs={8}>
                <div className="d-flex justify-content-center">
                  <p className="display-6 fw-bold text-bianco ">
                    {profile?.nome} {profile?.cognome}
                  </p>
                </div>
                <p className="m-0 text-quaternario fw-bold">Email:</p>
                <p className="text-white-50">{profile?.email}</p>
                <p className="m-0 text-quaternario fw-bold">Username:</p>
                <p className="text-white-50">{profile?.username}</p>
              </Col>
            </Row>
            <hr className="border-3 opacity-none border-quaternario mb-0" />
            <Tabs
              defaultActiveKey="gruppo"
              id="fill-tab-example"
              className="mb-3 border-0"
              fill
            >
              <Tab eventKey="gruppo" title="Gruppo">
                <TuoGruppo mioGruppo={profile?.gruppo} />
              </Tab>
              <Tab eventKey="PostPublicati" title="Post publicati">
                {profile !== null && <TuoiPost utente={profile} />}
              </Tab>
            </Tabs>
          </>
        )}
      </Container>
    </>
  );
};
export default ProfiloDettaglio;
