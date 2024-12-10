import React, { useState } from "react";
import styled from "styled-components";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

// Styled components
const AuthPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("https://media.istockphoto.com/id/1409988369/photo/wave-particles-lines-with-swirling-pattern-3d-rendering.jpg?s=2048x2048&w=is&k=20&c=0uD6kQtiDAQkZjnbaVD6LrOU7KNq7QcTuBNdCwdz2rQ=") no-repeat center center/cover;
  font-family: "Poppins", sans-serif;
`;

const GlassEffectBox = styled.div`
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.05); /* Increased transparency */
  backdrop-filter: blur(25px); /* Stronger blur for better effect */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.6); /* Slightly darker shadow */
  text-align: center;
`;

const TitleContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: 600;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 45px 12px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  outline: none;
  transition: background 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const InputIcon = styled.span`
  position: absolute;
  right: 15px;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(90deg, #e52e71, #ff8a00);
  }
`;

const SwitchText = styled.p`
  margin-top: 10px;
  color: #ffffff;
  font-size: 0.9rem;

  a {
    color: #ff8a00;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Component
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password, ...(isLogin ? {} : { username }) };

    try {
      const url = isLogin
        ? "http://localhost:5000/login"
        : "http://localhost:5000/register";
      const { data } = await axios.post(url, payload);
      alert(data.message || "Success!");
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <AuthPageContainer>
      <GlassEffectBox>
        <TitleContainer>
          <Title>{isLogin ? "Login" : "Register"}</Title>
        </TitleContainer>
        <StyledForm onSubmit={handleSubmit}>
          {!isLogin && (
            <InputGroup>
              <StyledInput
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <InputIcon>
                <FaUser />
              </InputIcon>
            </InputGroup>
          )}
          <InputGroup>
            <StyledInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputIcon>
              <FaEnvelope />
            </InputIcon>
          </InputGroup>
          <InputGroup>
            <StyledInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <InputIcon>
              <FaLock />
            </InputIcon>
          </InputGroup>
          <SubmitButton type="submit">
            {isLogin ? "Login" : "Register"}
          </SubmitButton>
        </StyledForm>
        <SwitchText>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a href="#" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </a>
        </SwitchText>
      </GlassEffectBox>
    </AuthPageContainer>
  );
};

export default AuthPage;
