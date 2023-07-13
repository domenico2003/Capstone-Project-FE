import {
  Button,
  Col,
  Container,
  Dropdown,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setProfileAction } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NoAccessContent from "./NoAccessContent";
import { IoMdSettings } from "react-icons/io";
import { useEffect } from "react";
import TuoGruppo from "./TuoGruppo";

const MyAccount = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let profile = useSelector((state) => state.profilo.me);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setProfileAction(null));
    navigate("/login");
  };

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    <>
      <Container className="mt-5">
        {localStorage.getItem("token") != null ? (
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
                <Row className="justify-content-end">
                  <Col xs={3}>
                    {" "}
                    <Dropdown className="d-flex justify-content-end">
                      <Dropdown.Toggle
                        drop={"down-centered"}
                        className={`text-white-50  border-0 clicked`}
                        id="dropdown-basic"
                      >
                        <IoMdSettings className="h3 m-0" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="bg-primario border-2 border-quaternario p-0 ">
                        <div className="d-flex flex-column w-100 ">
                          <Button
                            variant="outline-quaternario"
                            className="mb-2 border-0 border-bottom border-quaternario border-3"
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                          <Button
                            variant="outline-quaternario"
                            className=" border-0 border-top border-quaternario border-3"
                          >
                            Modifica
                          </Button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
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
              defaultActiveKey="profile"
              id="fill-tab-example"
              className="mb-3 border-0"
              fill
            >
              <Tab eventKey="il tuo gruppo" title="il tuo gruppo">
                <TuoGruppo mioGruppo={profile?.gruppo} />
              </Tab>
              <Tab eventKey="i Tuoi Post" title="i Tuoi Post">
                Tab content for Profile
              </Tab>
              <Tab
                eventKey="Videogiochi Preferiti"
                title="Videogiochi Preferiti"
              >
                Tab content for Loooonger Tab
              </Tab>
              {profile?.ruolo === "ADMIN" && (
                <Tab
                  eventKey="Videogiochi aggiunti"
                  title="Videogiochi aggiunti"
                >
                  Tab content for Contact
                </Tab>
              )}
              <Tab eventKey="gruppi creati" title="gruppi creati">
                Tab content for Contact
              </Tab>
            </Tabs>
          </>
        ) : (
          <div className="mt-5">
            <NoAccessContent />
          </div>
        )}
      </Container>
    </>
  );
};
export default MyAccount;
