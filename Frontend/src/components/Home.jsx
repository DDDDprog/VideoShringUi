import React from "react";
import styled from "styled-components";

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  font-family: "Poppins", sans-serif;
`;

const WelcomeMessage = styled.h1`
  font-size: 3rem;
  color: #333;
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <WelcomeMessage>Welcome to the Home Page!</WelcomeMessage>
    </HomePageContainer>
  );
};

export default HomePage;
