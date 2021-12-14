import React, { useEffect, useState } from "react";
//Styling and animation
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
//api
import { loadDetail } from "../actions/detailsAction";
//Redux
import { useSelector, useDispatch } from "react-redux";
//Router
import { useHistory } from "react-router-dom";
//Media resize
import { smallImage } from "../util";
//Game platform images
import playstation from "../img/playstation.svg";
import gamepad from "../img/gamepad.svg";
import steam from "../img/steam.svg";
import apple from "../img/apple.svg";
import xbox from "../img/xbox.svg";
//Star images
import starFull from "../img/star-full.png";
import starEmpty from "../img/star-empty.png";

const GameDetails = ({ pathId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [allGamesIds, setAllGamesIds] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(null);

  //Close details
  const closeDetails = () => {
    document.body.style.overflow = "auto";
    history.push("/");
  };
  //Exit detail
  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      history.push("/");
    }
  };
  //Get platform images
  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 4":
        return playstation;
      case "Xbox One":
        return xbox;
      case "PC":
        return steam;
      case "iOS":
        return apple;
      default:
        return gamepad;
    }
  };
  //Star raiting
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull} />);
      } else stars.push(<img alt="star" key={i} src={starEmpty} />);
    }
    return stars;
  };
  //Get ids from games in same section
  const getIDs = (section) => {
    section.map((game) => {
      return setAllGamesIds((state) => [...state, game.id.toString()]);
    });
  };
  //Get active game index in section array
  const activeGameIndex = () => {
    const gameIndex = (gameID) => gameID == pathId;
    const index = allGamesIds.findIndex(gameIndex);
    setCurrentGameIndex(index);
  };
  ////Get next game in section array
  const getNextGame = () => {
    const next = currentGameIndex + 1;
    setCurrentGameIndex(next);
    dispatch(loadDetail(allGamesIds[next]));
  };
  ////Get previous game in section array
  const getPreviousGame = () => {
    const previous = currentGameIndex - 1;
    setCurrentGameIndex(previous);
    dispatch(loadDetail(allGamesIds[previous]));
  };
  //Data
  const { screen, game, isLoading, section } = useSelector(
    (state) => state.detail
  );
  //Data for switching next/previous game
  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games
  );
  useEffect(() => {
    switch (section) {
      case "Popular Games":
        return getIDs(popular);
      case "Upcoming Games":
        return getIDs(upcoming);
      case "New Games":
        return getIDs(newGames);
      case "Searched Games":
        return getIDs(searched);
      default:
        return {};
    }
  }, []);
  useEffect(() => {
    activeGameIndex();
  }, [allGamesIds]);
  return (
    <>
      <CardShadow className="shadow" onClick={exitDetailHandler}>
        <Detail className="detail">
          <Close onClick={closeDetails}>X</Close>
          <ButtonWrapper>
            <button
              onClick={getPreviousGame}
              disabled={currentGameIndex == 0 ? true : false}>
              Previous
            </button>
            <span></span>
            <button
              onClick={getNextGame}
              disabled={
                currentGameIndex == allGamesIds.length - 1 ? true : false
              }>
              Next
            </button>
          </ButtonWrapper>
          {isLoading ? (
            <LoaderContainer>
              <Loader>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </Loader>
            </LoaderContainer>
          ) : (
            <DetailWrapper layoutId={pathId}>
              <Stats>
                <div className="rating">
                  <motion.h3 layoutId={`title ${pathId}`}>
                    {game.name}
                  </motion.h3>
                  <p>Rating: {game.rating}</p>
                  {getStars()}
                </div>
                <Info>
                  <h3>Platforms</h3>
                  <Platforms>
                    {game.platforms &&
                      game.platforms.map((data) => {
                        return (
                          <img
                            alt={data.platform.name}
                            key={data.platform.id}
                            src={getPlatform(data.platform.name)}
                          />
                        );
                      })}
                  </Platforms>
                </Info>
              </Stats>
              <Media>
                {game.background_image && (
                  <motion.img
                    layoutId={`image ${pathId}`}
                    src={smallImage(game.background_image, 1280)}
                    alt={game.background_image}
                  />
                )}
              </Media>
              <Description>
                <p>{game.description_raw}</p>
              </Description>
              <div className="gallery">
                {screen.results &&
                  screen.results.map((screen) => {
                    return (
                      <img
                        src={smallImage(screen.image, 1280)}
                        key={screen.id}
                        alt={screen.image}
                      />
                    );
                  })}
              </div>
            </DetailWrapper>
          )}
        </Detail>
      </CardShadow>
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  //
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
`;
const Detail = styled(motion.div)`
  width: 80%;
  min-height: 100vh;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background-color: #fff;
  position: absolute;
  top: 5%;
  left: 10%;
  color: #000;
  opacity: 1 !important;
  img {
    width: 100%;
  }
  @media (max-width: 767px) {
    width: 90%;
    left: 5%;
    padding: 1rem;
  }
`;
const DetailWrapper = styled(motion.div)`
  //
`;
const Close = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  color: white;
  font-weight: 900;
  font-size: 20px;
  padding: 0.5rem;
  background-color: #1b1b1b;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    cursor: pointer;
    border: none;
    outline: none;
    padding: 1rem;
    margin: 0.5rem;
    color: #ff7676;
    font-weight: 900;
    font-size: 20px;
    background-color: transparent;
  }
  button:disabled {
    color: rgba(255, 118, 118, 0.5);
  }
  span {
    display: inline-block;
    width: 3px;
    height: 20px;
    background-color: #ff7676;
  }
`;
const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    display: inline;
    width: 2rem;
    height: 2rem;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    text-align: center;
  }
`;
const Info = styled(motion.div)`
  text-align: center;
`;
const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
`;
const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;
const Description = styled(motion.div)`
  padding: 5rem 0;
`;
const spinning1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;
const spinning2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;
const spinning3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;
const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50vh;
  justify-content: center;
  align-items: center;
`;
const Loader = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #ff7676;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 8px;
    animation: ${spinning1} 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: ${spinning2} 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: ${spinning2} 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: ${spinning3} 0.6s infinite;
  }
`;

export default GameDetails;
