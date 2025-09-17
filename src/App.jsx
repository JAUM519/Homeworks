import "./App.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Props from "./Challenge 2.jsx";
import Hooks from "./Challenge 3.jsx";
import { ComponentApp } from "./Challenge 4.jsx";
import { Father } from "./Challenge 5.jsx";
import Challenge6 from "./Challenge 6.jsx";
import Challenge7 from "./Challenge 7.jsx";
import Login from "./Pagina Login/Login.jsx";
import Perfil from "./Perfil.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Challenge7Index from "./Pagina challenge 7/Challenge7Index.jsx";
import SongPlayer from "./Pagina challenge 7/SongPlayer.jsx";
import BrowserHistory from "./Pagina challenge 7/BrowserHistory.jsx";


function AuthStatusBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 8, borderBottom: "1px solid #eee" }}>
      <span>Challenge de Jorge</span>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>👤 {user.username}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Ingresar</Link>
        )}
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="grid-container">
      <div className="grid-item">
        <h1>Hola Mundo!</h1>
        <h2>Bienvenido</h2>
        <p style={{ marginTop: 8 }}></p>
      </div>
      <div className="grid-item"><Props /></div>
      <div className="grid-item"><Hooks /></div>
      <div className="grid-item"><ComponentApp /></div>
      <div className="grid-item"><Father /></div>
      <div className="grid-item"><Challenge6 /></div>
  <div className="grid-item"><Challenge7 /></div>
    </div>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthStatusBar />
        <Routes>
          /* Públicas */
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          /* Challenge 7 */
          <Route path="/challenge7" element={<Challenge7Index />} />
          <Route path="/challenge7/canciones" element={<SongPlayer />} />
          <Route path="/challenge7/historial" element={<BrowserHistory />} />

          /* Privadas */
          <Route element={<PrivateRoute />}>
            <Route path="/perfil" element={<Perfil />} />
          </Route>

          /* 404 */
          <Route path="*" element={<div style={{ padding: 16 }}><h1>404</h1><p>Ruta no encontrada</p></div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
