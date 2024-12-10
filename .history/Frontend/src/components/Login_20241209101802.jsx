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
  background: url("data:image/jpeg;base64,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") no-repeat center center/cover;
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
