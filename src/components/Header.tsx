import React from 'react';
import VideoCarousel from './VideoCarousel';
import styled from '@emotion/styled';
import SettingsMenu from './SettingsMenu';

const HeaderContainer = styled.header`
  position: relative;
  height: 350px;
  width: 100%;
  overflow: hidden;
`;

const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(127, 127, 127, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  z-index: 2;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <VideoCarousel />
      <HeaderOverlay>Find your new best friend</HeaderOverlay>
      <SettingsMenu />
    </HeaderContainer>
  );
};

export default Header;
