import { profileFetch } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function HomePage() {
  let dispatch = useDispatch();
  let profile = useSelector((state) => state.profilo.me);

  useEffect(() => {
    console.log(localStorage.getItem("token") != null);
    if (localStorage.getItem("token") != null) {
      dispatch(profileFetch());
    }
  }, []);

  useEffect(() => {
    console.log(profile);
  }, [profile]);
  return (
    <>
      {profile !== null && (
        <p className="text-bianco">
          benvenuto {profile?.nome} {profile?.cognome}
        </p>
      )}
    </>
  );
}

export default HomePage;
