import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./sass/style.scss";
import MyNavbar from "./components/MyNavbar";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" />
        {
          //element={}/ >
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
