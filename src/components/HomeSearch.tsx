import SwapVertIcon from '@mui/icons-material/SwapVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import Tooltip from '@mui/material/Tooltip';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchDogDetails, fetchDogs } from '../utils/api';
import { Dog } from '../types';

const SearchNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 12px 0;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  gap: 20px;
`;

function HomeSearch() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDogs = async () => {
      try {
        setLoading(true);

        // Step 1: Fetch the list of IDs
        const searchResponse = await fetchDogs({ size: 25 }); // Adjust size as needed
        const dogIds = searchResponse.resultIds; // This should already be string[].

        // Step 2: Fetch details for those IDs
        const dogDetails = await fetchDogDetails(dogIds); // Pass dogIds directly.

        setDogs(dogDetails);
      } catch (err) {
        setError('Failed to load dogs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <SearchNav>
        <div className='BestMatchSearch'>
          <button>Best Match</button>
        </div>
        <IconContainer>
          <Tooltip title='Sort'>
            <IconButton>
              <SwapVertIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Filter'>
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </IconContainer>
      </SearchNav>
      <div>
        <h1>Available Dogs</h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {dogs.map((dog) => (
            <div
              key={dog.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <img
                src={dog.img}
                alt={dog.name}
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <h3>{dog.name}</h3>
              <p>Breed: {dog.breed}</p>
              <p>Age: {dog.age} years</p>
              <p>Zip Code: {dog.zip_code}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeSearch;
