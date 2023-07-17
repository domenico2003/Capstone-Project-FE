import { useEffect } from "react";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const StarVideogioco = ({ videogioco, className }) => {
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
    <span className={className}>
      {stellePiene.map((nStella) => (
        <AiFillStar key={nStella} />
      ))}
      {stelleVuote.map((nStella) => (
        <AiOutlineStar key={nStella} />
      ))}
    </span>
  );
};
export default StarVideogioco;
