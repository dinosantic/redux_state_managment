import React, { useRef } from "react";
//Styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
//Redux
import { useDispatch } from "react-redux";
//Actions
import { loadDetail } from "../actions/detailsAction";
//Router
import { Link } from "react-router-dom";
//Media resize
import { smallImage } from "../util";

const Game = ({ name, released, id, image }) => {
  //ref to game
  const game = useRef();
  //convert id to string
  const stringPathId = id.toString();
  //Load details
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    game.current.style.visibility = "visible !important";
    dispatch(loadDetail(id));
  };

  return (
    <StyledGame ref={game} layoutId={stringPathId} onClick={loadDetailHandler}>
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <p>{released}</p>
        <p>{id}</p>
        <motion.img
          layoutId={`image ${stringPathId}`}
          src={smallImage(image, 640)}
          alt={name}
        />
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
  overflow: hidden;
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
