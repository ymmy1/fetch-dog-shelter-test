import React from 'react';
import styled from '@emotion/styled';
import {
  Pets,
  LocationOn,
  AccessTime,
  EmojiEvents,
  Favorite,
} from '@mui/icons-material';
import { Dog } from '../types';
import { useFavorites } from '../context/FavoritesContext';

const CardContainer = styled.div`
  position: relative;
  max-width: 400px;
  height: 500px;
  border-radius: 16px;
  border: 4px solid gold;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.4);
  }
`;

const DogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoLayer = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
  width: 100%;
`;

const DogName = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
`;

const DogDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  flex-wrap: wrap;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    font-size: 20px;
  }
`;

const CrownIcon = styled.div`
  position: absolute;
  top: 0px;
  left: 16px;
  color: gold;
  font-size: 36px;
`;

const FavoriteIconContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;

  svg {
    font-size: 28px;
    color: ${(props: { isFavorite: boolean }) =>
      props.isFavorite ? 'red' : 'rgba(255, 255, 255, 0.7)'};
    transition: color 0.3s;

    &:hover {
      color: red;
    }
  }
`;

const BestDogCard: React.FC<{ dog: Dog }> = ({ dog }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((favDog) => favDog.id === dog.id);

  return (
    <CardContainer>
      <CrownIcon>
        <EmojiEvents />
      </CrownIcon>
      <DogImage src={dog.img} alt={dog.name} />
      <FavoriteIconContainer
        isFavorite={isFavorite}
        onClick={() => toggleFavorite(dog)}
      >
        <Favorite />
      </FavoriteIconContainer>
      <InfoLayer>
        <DogName>{dog.name}</DogName>
        <DogDetails>
          <DetailItem>
            <Pets />
            {dog.breed}
          </DetailItem>
          <DetailItem>
            <AccessTime />
            {dog.age} yrs
          </DetailItem>
          <DetailItem>
            <LocationOn />
            {dog.zip_code}
          </DetailItem>
        </DogDetails>
      </InfoLayer>
    </CardContainer>
  );
};

export default BestDogCard;
