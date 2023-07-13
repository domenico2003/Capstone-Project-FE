export const SET_PROFILE = "SET_PROFILE";
export const SET_VIDEOGIOCHI_HOME = "SET_VIDEOGIOCHI_HOME";
export const SET_GRUPPI_HOME = "SET_GRUPPI_HOME";

export const setProfileAction = (dato) => {
  return { type: SET_PROFILE, payload: dato };
};

export const setVideogiochiHomeAction = (dato) => {
  return { type: SET_VIDEOGIOCHI_HOME, payload: dato };
};

export const setGruppiHomeAction = (dato) => {
  return { type: SET_GRUPPI_HOME, payload: dato };
};

export const profileFetch = () => {
  return async (dispatch) => {
    const URL = "http://localhost:3001/utente/me";
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        dispatch(setProfileAction(dato));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const gruppiHomeFetch = () => {
  return async (dispatch) => {
    const URL = "http://localhost:3001/gruppo";
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        dispatch(setGruppiHomeAction(dato));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const videogiochiHomeFetch = () => {
  return async (dispatch) => {
    const URL = "http://localhost:3001/videogioco/all?valutazioneMedia=4";

    try {
      let risposta = await fetch(URL);
      if (risposta.ok) {
        let dato = await risposta.json();
        dispatch(setVideogiochiHomeAction(dato.content));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
