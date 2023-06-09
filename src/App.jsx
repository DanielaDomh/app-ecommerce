import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AppNavBar from "./components/AppNavBar";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Purchases from "./pages/Purchases";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import ProtectRoutes from "./components/ProtectedRoutes";

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <HashRouter>
      {/* El Loader se activará cada vez que hagamos una petición y su valor será un boolean, es visible o no, punto.*/}
      {isLoading && <Loader/>}
      <AppNavBar/>
      {/* Fluid es para "aprovechar" todo el espacio */}
      <Container fluid>
        <Routes>
          <Route element={<Home/>} path="/" />
          <Route element={<Login/>} path="/Login" />
          <Route element={<ProductDetails/>} path="/product/:id" />
          <Route element={<ProtectRoutes/>}>
          <Route element={<Purchases/>} path="/Purchases" />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
