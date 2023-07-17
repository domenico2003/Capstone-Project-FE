import { useEffect } from "react";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const StarVideogioco = ({ videogioco, className, valutazioneRecensione }) => {
  const [stellePiene, setStellePiene] = useState([]);
  const [stelleVuote, setStelleVuote] = useState([]);
  const [valutazione, setValutazione] = useState();

  useEffect(() => {
    if (videogioco !== undefined) {
      setValutazione(videogioco?.valutazioneMedia);
    } else if (valutazioneRecensione !== undefined) {
      setValutazione(valutazioneRecensione);
    }
  }, [videogioco, valutazioneRecensione]);
  useEffect(() => {
    let piene = [];
    let vuote = [];
    for (let index = 0; index < valutazione; index++) {
      piene = [...piene, index + "fil"];
    }
    for (let index = 0; index < 5 - valutazione; index++) {
      vuote = [...vuote, index + "notFil"];
    }
    setStellePiene(piene);
    setStelleVuote(vuote);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valutazione]);
  return (
    <span className={className}>
      {stellePiene?.map((nStella) => (
        <AiFillStar key={nStella} />
      ))}
      {stelleVuote?.map((nStella) => (
        <AiOutlineStar key={nStella} />
      ))}
    </span>
  );
};
export default StarVideogioco;
