import styled from '@emotion/styled';
import loginImage from '../assets/login_bg.webp';

export const DefaultBackground = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  color: #333;
  background-color: #f2f2f2;
  background: url(${loginImage}) no-repeat center center fixed;
  background-size: cover;
  background-attachment: fixed;
`;
