import React from "react";
import { useNavigate } from "react-router-dom";

const Challenge8 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Challenge 8</h1>
      <button onClick={() => navigate('/challenge8')}>Ver Challenge 8</button>
    </div>
  );
};

export default Challenge8;
