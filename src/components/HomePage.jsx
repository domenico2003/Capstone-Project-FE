import { profileFetch } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function HomePage() {
  let dispatch = useDispatch();
  let profile = useSelector((state) => state.profilo.me);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(profileFetch());
    }
  }, []);

  useEffect(() => {
    console.log(profile);
  }, [profile]);
  return;
}

export default HomePage;
