export const SET_PROFILE = "SET_PROFILE";

export const setProfileAction = (dato) => {
  return { type: SET_PROFILE, payload: dato };
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
