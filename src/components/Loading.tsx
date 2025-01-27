import React from 'react';
import styled from '@emotion/styled';
import pawPrint from '../assets/pawPrint.png';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 16px;
  margin-top: 50px;
`;

const PawAnimation = styled.div`
  display: flex;
  gap: 8px;

  & img {
    width: 40px;
    height: 40px;
    animation: bounce 1.5s infinite ease-in-out;
  }

  & img:nth-of-type(1) {
    animation-delay: 0s;
  }
  & img:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  & img:nth-of-type(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <PawAnimation>
        <img src={pawPrint} alt='Paw Print' />
        <img src={pawPrint} alt='Paw Print' />
        <img src={pawPrint} alt='Paw Print' />
      </PawAnimation>
      <Message>Fetching the cutest dogs for you...</Message>
    </LoadingContainer>
  );
};

export default Loading;
