import styled from '@emotion/styled';

import { DefaultBackground } from '../components/DefaultBackground';
import Header from '../components/Header';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeSearch from '../components/HomeSearch';
import Favorites from '../components/Favorites';
import Box from '@mui/material/Box';
import colors from '../styles/colors';
import Footer from '../components/Footer';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: clamp(320px, 100%, 720px);
  min-height: inherit;
  background: #ffffff;
  box-shadow: 0px 0px 20px 12px rgb(255 255 255 / 50%);
  margin-bottom: 30px;
  border-radius: 0 0 20px 20px;
  padding-bottom: 20px;
`;

const Home: React.FC = () => {
  const [tab, setTab] = useState('HOME');

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  return (
    <>
      <DefaultBackground aria-label='Home Page'>
        <HomeContainer>
          <Header />
          <TabContext value={tab}>
            <Box
              sx={{
                bgcolor: colors.primary,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Tabs
                value={tab}
                onChange={handleTabChange}
                aria-label='icon label tabs'
                centered
              >
                <Tab icon={<PetsIcon />} label='HOME' value={'HOME'} />
                <Tab
                  icon={<FavoriteIcon />}
                  label='FAVORITES'
                  value={'FAVORITES'}
                />
              </Tabs>
            </Box>
            <TabPanel value='HOME' sx={{ padding: 0 }}>
              <HomeSearch />
            </TabPanel>
            <TabPanel value='FAVORITES' sx={{ padding: 0 }}>
              <Favorites />
            </TabPanel>
          </TabContext>
        </HomeContainer>
      </DefaultBackground>
      <Footer />
    </>
  );
};

export default Home;
