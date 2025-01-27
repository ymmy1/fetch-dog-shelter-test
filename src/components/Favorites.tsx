import React from 'react';
import styled from '@emotion/styled';
import { useFavorites } from '../context/FavoritesContext';
import DogCard from './DogCard';

const FavoritesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 0 16px;
`;

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <p>No favorite dogs yet. Start adding some!</p>;
  }

  return (
    <>
      <h1>Favorite Dogs ({favorites.length})</h1>
      <FavoritesGrid>
        {favorites.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </FavoritesGrid>
    </>
  );
};

export default Favorites;
