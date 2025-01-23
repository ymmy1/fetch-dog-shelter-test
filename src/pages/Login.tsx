import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import styled from '@emotion/styled';
import loginImage from '../assets/login_bg.webp';

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

function Login() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };

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
        <TextField label='Name' variant='outlined' fullWidth required />
        <TextField
          label='Email'
          variant='outlined'
          type='email'
          fullWidth
          required
        />
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </Box>
    </LoginContainer>
  );
}

export default Login;
