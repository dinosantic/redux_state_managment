import React, { useState } from "react";
//Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";
//Redux and Routes
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch, useSelector } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");
  //Data
  const { searched } = useSelector((state) => state.games);
  //
  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(textInput));
    setTextInput("");
  };
  const clearSearch = () => {
    dispatch({ type: "CLEAR_SEARCHED" });
  };
  return (
    <StyledNav>
      <Logo onClick={clearSearch}>
        <img src={logo} alt="logo" />
        <h1>Ignite</h1>
        {searched.length > 0 ? <TooltipText>Clear search</TooltipText> : ""}
      </Logo>
      <form className="search" onSubmit={submitSearch}>
        <input value={textInput} onChange={inputHandler} type="text" />
        <button type="submit">Search</button>
      </form>
    </StyledNav>
  );
};

const StyledNav = styled(motion.div)`
  padding: 3rem 5rem;
  text-align: center;
  input {
    width: 30%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  }
  button {
    font-size: 1.75rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background-color: #ff7676;
    color: white;
  }
  @media (max-width: 767px) {
    padding: 1rem;
    input {
      width: 50%;
      font-size: 1rem;
    }
    button {
      font-size: 1.25rem;
      padding: 0.5rem 1rem;
    }
  }
`;
const TooltipText = styled(motion.span)`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  top: -20px;
  z-index: 1;
`;
const Logo = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    ${TooltipText} {
      visibility: visible;
    }
  }
  img {
    padding: 0 0.5rem;
  }
`;

export default Nav;
