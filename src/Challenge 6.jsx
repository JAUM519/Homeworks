import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Challenge6 = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div>
      <h1>Challenge 6</h1>
      {user ? (
        <>
          <p>Ya iniciaste sesión como <strong>{user.username}</strong>.</p>
          <button onClick={() => navigate("/perfil")}>Ir a Perfil</button>
        </>
      ) : (
        <button onClick={() => navigate("/login")}>Ir a Login</button>
      )}
    </div>
  );
};

export default Challenge6;
