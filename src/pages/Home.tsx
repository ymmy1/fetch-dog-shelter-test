import styled from '@emotion/styled';

import { DefaultBackground } from '../components/DefaultBackground';
import Header from '../components/Header';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: clamp(320px, 100%, 720px);
  min-height: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 20px 12px rgb(255 255 255 / 50%);
`;

const Home: React.FC = () => {
  return (
    <DefaultBackground aria-label='Home Page'>
      <HomeContainer>
        <Header />
        <h1>Home</h1>
      </HomeContainer>
    </DefaultBackground>
  );
};

export default Home;
