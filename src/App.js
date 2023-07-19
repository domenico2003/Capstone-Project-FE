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
import Videogiochi from "./components/Videogiochi";
import DettaglioVideogioco from "./components/DettaglioVideogioco";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/videogiochi" element={<Videogiochi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<MyAccount />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/gruppi/:id" element={<TuoGruppo />} />
        <Route path="/videogiochi/:id" element={<DettaglioVideogioco />} />
        <Route path="/profilo/:id" element={<ProfiloDettaglio />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
