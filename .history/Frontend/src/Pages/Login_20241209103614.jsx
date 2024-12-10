import React, { useState } from "react";
import styled from "styled-components";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Styled Components (Same as your original code)
const AuthPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("https://static.vecteezy.com/system/resources/thumbnails/037/814/719/small_2x/ai-generated-autumn-leaves-in-the-forest-nature-background-photo.jpg") no-repeat center center/cover;
  font-family: "Poppins", sans-serif;
`;

// Other styled components (same as your code) ...

// Component
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // State for feedback message
  const navigate = useNavigate(); // Use navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password, ...(isLogin ? {} : { username }) };

    try {
      const url = isLogin
        ? "http://localhost:5000/login"
        : "http://localhost:5000/register";
      const { data } = await axios.post(url, payload);

      // Display success message
      setMessage({ text: data.message || "Success!", type: "success" });

      if (isLogin) {
        // Redirect to the homepage after successful login
        navigate("/home"); // Use navigate to go to the home page
      }
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
