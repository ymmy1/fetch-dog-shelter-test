import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';
import styled from '@emotion/styled';
import loginImage from '../assets/login_bg.webp';
import { login } from '../utils/api';
import { useAuth } from '../auth/AuthProvider';

const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  color: #333;
  background-color: #f2f2f2;
  background: url(${loginImage}) no-repeat center center fixed;
  background-size: cover;
`;

const Login: React.FC = () => {
  const { isAuthenticated, setAuthenticated } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(name, email);
      setAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <LoginContainer aria-label='Login Page'>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <h1>Login</h1>
        <TextField
          label='Name'
          variant='outlined'
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label='Email'
          variant='outlined'
          type='email'
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </Box>
    </LoginContainer>
  );
};

export default Login;
