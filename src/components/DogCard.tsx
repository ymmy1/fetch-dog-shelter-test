import React from 'react';
import styled from '@emotion/styled';
import { Pets, LocationOn, AccessTime, Favorite } from '@mui/icons-material';
import { Dog } from '../types';
import { useFavorites } from '../context/FavoritesContext';

const CardContainer = styled.div`
  position: relative;
  max-width: 272px;
  height: 350px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
  }
`;

const DogImage = styled.img`
  width: 100%;
  max-height: 220px;
`;

const InfoLayer = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DogName = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.6);
`;

const DogDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  flex-wrap: wrap;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    font-size: 18px;
  }
`;

const FavoriteIconContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;

  svg {
    font-size: 24px;
    color: ${(props: { isFavorite: boolean }) =>
      props.isFavorite ? 'red' : 'rgba(255, 255, 255, 0.7)'};
    transition: color 0.3s;

    &:hover {
      color: red;
    }
  }
`;

const DogCard: React.FC<{ dog: Dog }> = ({ dog }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((favDog) => favDog.id === dog.id);

  return (
    <CardContainer>
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

export default DogCard;
