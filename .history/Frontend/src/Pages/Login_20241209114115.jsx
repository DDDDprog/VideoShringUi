import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import styled from "styled-components";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";

// Styled Components
const AuthPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../") no-repeat center center/cover;
  font-family: "Poppins", sans-serif;
`;

const GlassEffectBox = styled.div`
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  backdrop-filter: blur(25px); /* Blurred effect */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.6);
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

const Message = styled.div`
  margin-top: -10px;
  font-size: 0.9rem;
  color: ${({ type }) => (type === "success" ? "#4caf50" : "#f44336")}; // Green for success, red for error
  text-align: left;
  padding-left: 5px;
`;

// Component
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // State for feedback message
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password, ...(isLogin ? {} : { username }) };

    try {
      const url = isLogin
        ? "http://localhost:5000/login"
        : "http://localhost:5000/register";
      const { data } = await axios.post(url, payload);

      // Display success message and navigate to home page
      setMessage({ text: data.message || "Success!", type: "success" });
      // Redirect to home page (assuming "/home" route is set for home page)
      navigate("/home");
    } catch (err) {
      // Display error message
      setMessage({
        text: err.response?.data?.error || "Something went wrong!",
        type: "error",
      });
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <InputIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </InputIcon>
          </InputGroup>
          {message.text && <Message type={message.type}>{message.text}</Message>}
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
