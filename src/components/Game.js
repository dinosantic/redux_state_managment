import React from "react";
//Styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Game = ({ name, released, id, image }) => {
  return (
    <StyledGame>
      <h3>{name}</h3>
      <p>{released}</p>
      <p>{id}</p>
      <img src={image} alt={name} />
    </StyledGame>
  );
};
const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;

  img {
    width: 100%;
    height: 20vh;
    object-fit: cover;
  }
  @media (max-width: 767px) {
    img {
      width: 100%;
      height: auto;
    }
  }
`;
export default Game;
