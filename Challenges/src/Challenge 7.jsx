import React from "react";
import { useNavigate } from "react-router-dom";

const Challenge7 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Challenge 7</h1>
      <button onClick={() => navigate('/challenge7')}>Ver Challenge 7</button>
    </div>
  );
};

export default Challenge7;
