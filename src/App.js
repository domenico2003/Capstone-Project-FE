import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./sass/style.scss";
import MyNavbar from "./components/MyNavbar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import MyAccount from "./components/MyAccount";
import Registration from "./components/Registration";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<MyAccount />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
