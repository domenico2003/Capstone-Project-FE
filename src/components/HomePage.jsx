import {
  gruppiHomeFetch,
  profileFetch,
  videogiochiHomeFetch,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoGameController } from "react-icons/io5";
import VideogiocoHome from "./VideogiocoHome";
import { TbPlayerTrackNext } from "react-icons/tb";
import { MdGroups2 } from "react-icons/md";
import NoAccessContent from "./NoAccessContent";
import GruppiHome from "./GruppiHome";
function HomePage() {
  let dispatch = useDispatch();
  let profile = useSelector((state) => state.profilo.me);
  let videogiochi = useSelector((state) => state.home.videogiochi);
  let gruppi = useSelector((state) => state.home.gruppi.content);
  const navigate = useNavigate();
  useEffect(() => {
    if (videogiochi.length === 0) {
      dispatch(videogiochiHomeFetch());
    }
    if (localStorage.getItem("token") != null) {
      dispatch(gruppiHomeFetch());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container fluid className="header ">
        <Row xs={1} md={2} className="h-100">
          <Col className=" justify-content-center align-items-center  d-flex">
            <div className=" sx-div">
              <p className="text-bianco m-0 display-1 fw-bold">Benvenuto</p>
              <p className="text-bianco display-4 fw-bold m-0">
                {profile !== null ? `${profile?.nome} ` : "su "}
                <span
                  className={`${
                    profile !== null
                      ? "text-bianco display-4 fw-bold"
                      : "display-2 logo-no-nav"
                  }`}
                >
                  {profile !== null ? `${profile?.cognome}` : "gamerHUB"}
                </span>
              </p>
              <p className="blockquote-footer text-white mt-3">
                un sito per veri{" "}
                <span className="text-white-50 text-decoration-underline">
                  gamer
                </span>
              </p>
            </div>
          </Col>
          <Col className="  align-items-center d-none d-md-flex">
            <div className=" sx-div text-bianco">
              <p>
                Non sai a cosa{" "}
                <span className="text-quaternario fw-bold">giocare</span>?
              </p>
              <p>
                Vuoi trovare il{" "}
                <span className="text-quaternario fw-bold">videogioco</span>{" "}
                adatto alle tue{" "}
                <span className="text-quaternario fw-bold">esigenze</span>?
              </p>
              <p>
                Vuoi trovare{" "}
                <span className="text-quaternario fw-bold">qualquno</span> con
                cui <span className="text-quaternario fw-bold">giocare</span>?
              </p>
              <p>
                Vuoi{" "}
                <span className="text-quaternario fw-bold">messaggiare</span>{" "}
                con altri{" "}
                <span className="text-quaternario fw-bold">gamer</span> come te?
              </p>
              <p className="d-inline">
                Allora sei nel{" "}
                <span className="text-quaternario fw-bold">posto giusto</span>
              </p>
              {profile == null && (
                <p className=" d-inline">
                  ,
                  <Link to={"/login"} className="text-decoration-none ">
                    {" "}
                    accedi
                  </Link>{" "}
                  per visitare la sezione{" "}
                  <Link to={"/gruppi"} className="text-decoration-none ">
                    gruppi
                  </Link>{" "}
                  e la sezione{" "}
                  <Link to={"/videogiochi"} className="text-decoration-none ">
                    videogiochi
                  </Link>
                  .
                </p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="mt-5 mb-4 d-flex justify-content-between align-items-center ">
          <p className="h3 fw-bold text-bianco m-0">
            Videogiochi del momento{" "}
            <IoGameController className="text-quaternario iconeHome" />{" "}
          </p>
          <p
            className=" text-white-50 pointer m-0 d-none d-sm-flex align-items-center "
            onClick={() => navigate("/videogiochi")}
          >
            Vedi più{" "}
            <span className="text-quaternario ms-2">
              <TbPlayerTrackNext />
            </span>{" "}
          </p>
        </div>
        {videogiochi.length > 0 ? (
          videogiochi.map(
            (videogioco, index) =>
              index <= 3 && (
                <VideogiocoHome
                  key={index}
                  videogioco={videogioco}
                  indice={index}
                />
              )
          )
        ) : (
          <div className="bg-quaternario p-3 d-flex justify-content-center mt-5">
            <p className="text-bianco m-0">
              Ci dispiace, ma al momento non è possibile vedere qesti
              videogiochi
            </p>
          </div>
        )}

        <div className="mt-5 mb-4 d-flex justify-content-between align-items-center ">
          <p className="h3 fw-bold text-bianco m-0">
            Gruppi consigliati <MdGroups2 className="text-quaternario ms-1" />{" "}
          </p>
          <p
            className=" text-white-50 pointer m-0 d-none d-sm-flex align-items-center"
            onClick={() =>
              navigate(
                profile?.gruppo === null || profile?.gruppo === undefined
                  ? "/gruppi"
                  : "/gruppi/" + profile?.gruppo?.id
              )
            }
          >
            Vedi più{" "}
            <span className="text-quaternario ms-2">
              <TbPlayerTrackNext />
            </span>{" "}
          </p>
        </div>

        {localStorage.getItem("token") === null ? (
          <NoAccessContent />
        ) : (
          <Row className="justify-content-center justify-content-sm-evenly ">
            {gruppi?.map((group, index) => (
              <GruppiHome
                key={index + "/gruppoHome"}
                gruppo={group}
                index={index}
              />
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}

export default HomePage;
