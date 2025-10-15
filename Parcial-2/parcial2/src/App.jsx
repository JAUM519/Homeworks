import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Notifications from "./pages/Notifications";
import Directs from "./pages/Directs";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dms"
          element={
            <ProtectedRoute>
              <Directs />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div style={{padding:16}}>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}
