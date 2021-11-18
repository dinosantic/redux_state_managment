import React from "react";
//Styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
//Redux
import { useSelector } from "react-redux";
//Router
import { useHistory } from "react-router-dom";
//Media resize
import { smallImage } from "../util";
//Game platform images
import playstation from "../img/playstation.svg";
import gamepad from "../img/gamepad.svg";
import steam from "../img/steam.svg";
import apple from "../img/apple.svg";
import nintendo from "../img/nintendo.svg";
import xbox from "../img/xbox.svg";
//Star images
import starFull from "../img/star-full.png";
import starEmpty from "../img/star-empty.png";

const GameDetails = ({ pathId }) => {
  const history = useHistory();

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

  //Data
  const { screen, game, isLoading } = useSelector((state) => state.detail);

  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHandler}>
          <Detail layoutId={pathId}>
            <Stats>
              <div className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
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
          </Detail>
        </CardShadow>
      )}
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
  border-radius: 1rem;
  padding: 2rem 5rem;
  background-color: #fff;
  position: absolute;
  top: 5%;
  left: 10%;
  color: #000;
  img {
    width: 100%;
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

export default GameDetails;
