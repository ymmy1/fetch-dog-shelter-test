import { Dog, DogSearchParams, DogSearchResponse } from '../types';

const BASE_URL = 'https://frontend-take-home-service.fetch.com';

export const login = async (name: string, email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      throw new Error(`Failed to login: ${response.statusText}`);
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/dogs/breeds`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to logout: ${response.statusText}`);
    }

    console.log('Logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export const fetchDogs = async (
  params?: DogSearchParams
): Promise<DogSearchResponse> => {
  try {
    const query = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    const response = await fetch(`${BASE_URL}/dogs/search?${query}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dogs: ${response.statusText}`);
    }

    const data: DogSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dogs:', error);
    throw error;
  }
};

export const fetchDogDetails = async (dogIds: string[]): Promise<Dog[]> => {
  try {
    const response = await fetch(`${BASE_URL}/dogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dogIds),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dog details: ${response.statusText}`);
    }

    const data: Dog[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dog details:', error);
    throw error;
  }
};

export const fetchPaginatedDogs = async (
  page: number,
  size: number
): Promise<DogSearchResponse> => {
  const from = (page - 1) * size;
  const query = `size=${size}&from=${from}`;

  const response = await fetch(`${BASE_URL}/dogs/search?${query}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dogs: ${response.statusText}`);
  }

  const data: DogSearchResponse = await response.json();
  return data;
};

export const fetchAllBreeds = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/dogs/breeds`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch breeds: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
};

export const fetchDogsWithFilters = async (filters: {
  size?: number;
  from?: number;
  sort?: string;
  breeds?: string[];
  zipCodes?: string[];
}): Promise<{ dogs: Dog[]; total: number }> => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.size) queryParams.append('size', filters.size.toString());
    if (filters.from) queryParams.append('from', filters.from.toString());
    if (filters.sort) queryParams.append('sort', filters.sort);

    if (filters.breeds) {
      filters.breeds.forEach((breed) => queryParams.append('breeds', breed)); // Properly encode multiple breeds
    }

    if (filters.zipCodes) {
      filters.zipCodes.forEach((zip) => queryParams.append('zipCodes', zip)); // Properly encode zipCodes
    }

    const response = await fetch(
      `${BASE_URL}/dogs/search?${queryParams.toString()}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch dogs: ${response.statusText}`);
    }

    const data: DogSearchResponse = await response.json();

    const dogDetailsResponse = await fetch(`${BASE_URL}/dogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data.resultIds),
    });

    if (!dogDetailsResponse.ok) {
      throw new Error(
        `Failed to fetch dog details: ${dogDetailsResponse.statusText}`
      );
    }

    const dogs: Dog[] = await dogDetailsResponse.json();

    return { dogs, total: data.total };
  } catch (error) {
    console.error('Error fetching dogs with filters:', error);
    throw error;
  }
};

export const fetchBestMatch = async (favoriteIds: string[]): Promise<Dog[]> => {
  try {
    const response = await fetch(`${BASE_URL}/dogs/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(favoriteIds),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch best match: ${response.statusText}`);
    }

    const { match: matchedDogId } = await response.json();

    const dogDetailsResponse = await fetch(`${BASE_URL}/dogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify([matchedDogId]),
    });

    if (!dogDetailsResponse.ok) {
      throw new Error(
        `Failed to fetch dog details: ${dogDetailsResponse.statusText}`
      );
    }

    return await dogDetailsResponse.json();
  } catch (error) {
    console.error('Error fetching best match:', error);
    throw error;
  }
};
