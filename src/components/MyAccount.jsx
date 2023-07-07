import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setProfileAction } from "../redux/actions";
import { useDispatch } from "react-redux";
const MyAccount = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setProfileAction(null));
    navigate("/login");
  };
  return (
    <>
      <Button variant="quaternario" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};
export default MyAccount;
