import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AuthPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f7f7f7;
  font-family: 'Arial', sans-serif;
`;

const AuthBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #666;
  text-align: left;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const SwitchButton = styled.button`
  margin-top: 10px;
  background: none;
  color: #007bff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
`;

const Message = styled.p`
  margin-top: 20px;
  color: #28a745;
  font-size: 14px;
`;

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { email, password, username: isLogin ? undefined : username };

        try {
            const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
            const res = await axios.post(url, user);
            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                setMessage('Login successful');
            } else {
                setMessage('Registration successful');
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <AuthPageContainer>
            <AuthBox>
                <Title>{isLogin ? 'Login' : 'Register'}</Title>
                <Form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div>
                            <Label>Username</Label>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
                </Form>
                <Message>{message}</Message>
                <SwitchButton onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Create an account' : 'Already have an account? Login'}
                </SwitchButton>
            </AuthBox>
        </AuthPageContainer>
    );
};

export default AuthPage;
