import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Menu,
  Checkbox,
  FormControlLabel,
  Button,
  Tooltip,
  Pagination,
  Badge,
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import styled from '@emotion/styled';
import {
  fetchAllBreeds,
  fetchDogsWithFilters,
  fetchBestMatch,
} from '../utils/api';
import { Dog } from '../types';
import Loading from './Loading';
import DogCard from './DogCard';
import BestDogCard from './BestDogCard';
import { useFavorites } from '../context/FavoritesContext';

const FilterMenuContainer = styled.div`
  padding: 16px;
  max-width: 300px;
`;

const SearchNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
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
  const [isBestMatchMode, setIsBestMatchMode] = useState(false);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField] = useState('breed');

  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { favorites } = useFavorites();
  const pageSize = 24;

  const loadBreeds = async () => {
    try {
      const breedsData = await fetchAllBreeds();
      setBreeds(breedsData);
    } catch (err) {
      console.error('Error fetching breeds:', err);
    }
  };

  const loadDogs = async (useStoredFilters: boolean = false) => {
    try {
      setLoading(true);

      const storedBreeds = useStoredFilters
        ? JSON.parse(localStorage.getItem('selectedBreeds') || '[]')
        : selectedBreeds;

      const filters = {
        size: pageSize,
        from: (page - 1) * pageSize,
        sort: `${sortField}:${sortOrder}`,
        breeds: storedBreeds,
      };

      const { dogs: dogResults, total } = await fetchDogsWithFilters(filters);

      setDogs(dogResults);
      setTotalPages(Math.ceil(total / pageSize));

      if (useStoredFilters) {
        setSelectedBreeds(storedBreeds);
      }
    } catch (err) {
      setError('Failed to load dogs. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBestMatch = async () => {
    try {
      if (favorites.length === 0) {
        alert('No favorite dogs to find a best match!');
        return;
      }

      setLoading(true);
      setSelectedBreeds([]);
      setIsBestMatchMode(true);

      const favoriteIds = favorites.map((dog) => dog.id);

      const [bestMatchDog] = await fetchBestMatch(favoriteIds);

      setDogs([bestMatchDog]);
      setTotalPages(1);
    } catch (err) {
      setError('Failed to generate the best match. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    localStorage.setItem('selectedBreeds', JSON.stringify(selectedBreeds));
    setIsBestMatchMode(false);
    loadDogs();
  };

  const handleBreedChange = (breed: string) => {
    setSelectedBreeds((prev) =>
      prev.includes(breed) ? prev.filter((b) => b !== breed) : [...prev, breed]
    );
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    loadBreeds();

    const storedBreeds = localStorage.getItem('selectedBreeds');
    if (storedBreeds) setSelectedBreeds(JSON.parse(storedBreeds));

    loadDogs(true);
  }, [page, sortOrder, sortField]);

  return (
    <>
      <SearchNav>
        <IconContainer>
          <Tooltip title='Best Match'>
            <Button
              variant='contained'
              color='primary'
              onClick={handleBestMatch}
              sx={{ textTransform: 'none' }}
            >
              Best Match
            </Button>
          </Tooltip>

          <Tooltip title={`Sort by ${sortField} (${sortOrder})`}>
            <IconButton onClick={handleSort}>
              <SwapVertIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Filter'>
            <IconButton onClick={handleOpenMenu}>
              <Badge
                badgeContent={selectedBreeds.length}
                color='primary'
                invisible={selectedBreeds.length === 0}
              >
                <FilterListIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </IconContainer>
      </SearchNav>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <FilterMenuContainer>
          <h4>Filter by Breed</h4>
          {breeds.map((breed) => (
            <FormControlLabel
              key={breed}
              control={
                <Checkbox
                  checked={selectedBreeds.includes(breed)}
                  onChange={() => handleBreedChange(breed)}
                />
              }
              label={breed}
            />
          ))}

          <Button
            variant='contained'
            color='primary'
            onClick={handleCloseMenu}
            fullWidth
            style={{ marginTop: '16px' }}
          >
            Apply Filters
          </Button>
        </FilterMenuContainer>
      </Menu>

      {loading ? (
        <Loading />
      ) : error ? (
        <div>{error}</div>
      ) : isBestMatchMode && dogs.length === 1 ? (
        <div style={{ marginTop: '32px' }}>
          <h1>Your Best Match</h1>
          <BestDogCard dog={dogs[0]} />
        </div>
      ) : (
        <>
          <div>
            <h1>Available Dogs</h1>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px',
                padding: '0 16px',
              }}
            >
              {dogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          </div>

          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color='primary'
            size='large'
            sx={{
              marginTop: '16px',
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        </>
      )}
    </>
  );
}

export default HomeSearch;
