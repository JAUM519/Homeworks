import React from "react";
import { useNavigate } from "react-router-dom";

const Challenge9 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Challenge 9</h1>
      <button onClick={() => navigate('/challenge9')}>Ver Challenge 9</button>
    </div>
  );
};

export default Challenge9;
