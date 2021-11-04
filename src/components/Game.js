import React from "react";
//Styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
//Redux
import { useDispatch } from "react-redux";
//Actions
import { loadDetail } from "../actions/detailsAction";
//Router
import { Link } from "react-router-dom";

const Game = ({ name, released, id, image }) => {
  //Load details
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    dispatch(loadDetail(id));
  };

  return (
    <StyledGame onClick={loadDetailHandler}>
      <Link to={`/game/${id}`}>
        <h3>{name}</h3>
        <p>{released}</p>
        <p>{id}</p>
        <img src={image} alt={name} />
      </Link>
    </StyledGame>
  );
};
const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;

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
