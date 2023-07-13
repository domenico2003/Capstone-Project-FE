import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiSolidPencil, BiSolidCommentDetail } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FiArrowDown } from "react-icons/fi";

const SinglePost = ({ post }) => {
  let profile = useSelector((state) => state.profilo.me);
  const [spinnerStatus, setSpinnerStatus] = useState(false);
  const [publicante, setPublicante] = useState(null);
  const [miPiace, setMiPiace] = useState(null);
  const [showCommenti, setShowCommenti] = useState(false);
  const [allCommenti, setAllCommenti] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [altri, setAltri] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setPublicante(post?.utenteCheLoHaPublicato);
    setMiPiace(post?.numeroMiPiace);
  }, [post]);

  // useEffect(() => {
  //   console.log(allCommenti);
  // }, [allCommenti]);
  const handleMiPiace = () => {
    setMiPiace(miPiace + 1);
    miPiaceFetch();
  };
  //fetch per commento con validazione
  const [commento, setCommento] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    lasciaCommentoFetch();
  };

  const lasciaCommentoFetch = async () => {
    if (commento !== "") {
      setValidated(true);
      const URL = "http://localhost:3001/commento";
      const headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          utenteId: profile?.id,
          postId: post?.id,
          testo: commento,
        }),
      };

      try {
        let risposta = await fetch(URL, headers);
        if (risposta.ok) {
          let dato = await risposta.json();
          setCommento("");

          allCommentiFetch();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  //fetch mi piace
  const miPiaceFetch = async () => {
    const URL = "http://localhost:3001/post/miPiace/" + post?.id;
    const headers = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //fetch commenti

  useEffect(() => {
    if (pagina !== 0) {
      allCommentiFetch();
    }
  }, [pagina]);

  const allCommentiFetch = async () => {
    console.log("fetch");

    setSpinnerStatus(true);
    const URL =
      "http://localhost:3001/commento?postId=" + post?.id + "&page=" + pagina;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        setAltri(dato.last);
        console.log(dato);
        setAllCommenti([...allCommenti, ...dato?.content]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSpinnerStatus(false);
      }, 1500);
    }
  };

  return (
    <>
      <Col
        xs={11}
        md={9}
        xl={6}
        className="bg-secondario border border-2 border-quaternario mb-3"
      >
        <Row className=" p-3 text-bianco">
          <Col
            xs={2}
            sm={1}
            className="d-flex align-items-center pointer"
            onClick={() => navigate("/profilo/" + publicante?.id)}
          >
            <img
              className="immagine-nav "
              alt={publicante?.nome + " " + publicante?.cognome}
              src={publicante?.immagineProfilo}
            />
          </Col>
          <Col xs={10} sm={11} className="d-flex justify-content-between">
            <div
              className="pointer"
              onClick={() => navigate("/profilo/" + publicante?.id)}
            >
              <p className="m-0">
                {publicante?.nome + " " + publicante?.cognome}
              </p>
              <small className="m-0 text-white-50">{publicante?.email}</small>
            </div>
            {publicante?.id === profile?.id && (
              <div>
                <Button variant="outline-quaternario me-2">
                  <BiSolidPencil />
                </Button>
                <Button variant="outline-danger">
                  <BsFillTrashFill />
                </Button>
              </div>
            )}
          </Col>
        </Row>
        <hr className="border m-0 border-2 border-quaternario opacity-75" />
        <div className="p-3 text-white-50">
          <p>{post?.contenuto}</p>
          <div className="d-flex justify-content-center">
            {post?.immagine !== null && (
              <img
                className="img-fluid"
                src={post?.immagine}
                alt={"post/" + publicante?.username + post?.numeroMiPiace}
              />
            )}
          </div>
          <div className="d-block d-sm-flex justify-content-between mt-3">
            <small className="d-block d-sm-inline">
              publicato il: {post.dataCreazione}
            </small>
            <small>aggiornato il: {post.dataUltimoAggiornamento}</small>
          </div>
        </div>
        <hr className="border my-0  border-2 border-quaternario opacity-75" />
        <div className="p-3 text-white d-flex align-items-end justify-content-around">
          <div
            className="d-flex pointer align-items-center"
            onClick={() => handleMiPiace()}
          >
            <p className="m-0 h4">{miPiace} </p>
            <AiFillLike className="fw-bold h4 m-0 text-white" />
          </div>
          <BiSolidCommentDetail
            className="fw-bold h4 m-0 text-white pointer"
            onClick={() => {
              setShowCommenti(true);

              allCommentiFetch();
            }}
          />
        </div>
        {showCommenti && (
          <>
            <hr className="border my-0  border-2 border-quaternario opacity-75" />
            <div className="p-3">
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="d-flex mb-3 justify-content-center "
              >
                <Form.Control
                  type="text"
                  id="commento"
                  value={commento}
                  onChange={(e) => setCommento(e.target.value)}
                  placeholder="Lascia un commento"
                  aria-describedby="passwordHelpBlock"
                  className="input-commento shadow-sm rounded-start-pill borer-end-0 text-bianco"
                  required
                />
                <Button
                  variant="quaternario"
                  type="submit"
                  className="rounded-end-pill d-flex align-items-center border-bianco border-start-0 shadow-sm "
                  onClick={() => setAllCommenti([])}
                >
                  <FaArrowRight className="m-0 " />
                </Button>
              </Form>

              {!spinnerStatus &&
                allCommenti.length > 0 &&
                allCommenti?.map((comm, index) => (
                  <Container fluid key={index + "/comments"}>
                    <Row className=" mb-3 bg-primario">
                      <Col
                        xs={2}
                        sm={2}
                        className="d-flex p-3 px-0 align-items-center justify-content-center pointer border-end border-quaternario border-3 "
                        onClick={() => navigate("/profilo/" + comm?.autore?.id)}
                      >
                        <img
                          className="immagine-nav "
                          src={comm?.autore?.immagineProfilo}
                          alt={comm?.autore?.nome + " " + comm?.autore?.cognome}
                        />
                      </Col>
                      <Col xs={10} sm={10} className="py-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="m-0 text-bianco fw-bold ">
                            {comm?.autore?.username}
                          </p>
                          {comm?.autore?.id === profile?.id && (
                            <Dropdown className="d-flex justify-content-end">
                              <Dropdown.Toggle
                                drop={"down-centered"}
                                className={`text-white-50  border-0 clicked`}
                                id="dropdown-basic"
                              >
                                <BsThreeDots className="h5 m-0" />
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="bg-primario border-2 border-quaternario p-0 ">
                                <div className="d-flex flex-column w-100 ">
                                  <Button
                                    variant="outline-danger"
                                    className="mb-2 border-0 border-bottom border-danger border-3"
                                    // onClick={handleLogout}
                                  >
                                    Elimina
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
                          )}
                        </div>

                        <div>
                          <p className="m-0  text-white-50 fw-bold ">
                            {comm?.testo}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                ))}
              {!spinnerStatus && allCommenti.length > 0 && !altri && (
                <Row className="mx-3">
                  <Button
                    onClick={() => {
                      setPagina(pagina + 1);
                    }}
                    variant="outline-quaternario"
                  >
                    vedi altro <FiArrowDown />
                  </Button>
                </Row>
              )}
              {!spinnerStatus && allCommenti.length < 1 && (
                <p className="text-white-50 text-center mt-3 p-3 bg-primario h6">
                  questo post non ha commenti,commenta per primo
                </p>
              )}
              {/* spinner durante i caricamenti */}
              {spinnerStatus && (
                <div className="d-flex justify-content-center mt-5 mb-3">
                  <Spinner animation="grow" variant="quaternario" />
                </div>
              )}
            </div>
          </>
        )}
      </Col>
    </>
  );
};
export default SinglePost;
