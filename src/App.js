import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./sass/style.scss";
import MyNavbar from "./components/MyNavbar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import MyAccount from "./components/MyAccount";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import TuoGruppo from "./components/TuoGruppo";
import ProfiloDettaglio from "./components/ProfiloDettaglio";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<MyAccount />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/gruppi/:id" element={<TuoGruppo />} />
        <Route path="/profilo/:id" element={<ProfiloDettaglio />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
