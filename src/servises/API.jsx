import axios from 'axios';

const API_KEY = '7bee32b9ab5cc082183e484fcd988607';

export const fetchPopularFilms = async () => {
  const BASE_URL = 'https://api.themoviedb.org/3/trending/all/day';
  const response = await axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      language: 'en-US'
    },
  });

  console.log(response.data.results);
  return response.data.results;
};

export const fetchFilmDetails = async (filmId) => {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${filmId}`;
  const response = await axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      language: 'en-US'
    },
  });
  console.log(response.data);
  return response.data;
}

export const fetchFilmByValue = async (searchValue) => {
  const BASE_URL = `https://api.themoviedb.org/3/search/movie`;
  const response = await axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      query: searchValue,
      language: 'en-US'
    },
  });
  console.log(response.data);
  return response.data;
}

export const fetchCast = async (filmId) => {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${filmId}/credits`;
  const response = await axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      language: 'en-US'
    },
  });
  console.log(response.data);
  return response.data;
}

export const fetchRewiews = async (filmId) => {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${filmId}/reviews`;
  const response = await axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      language: 'en-US'
    },
  });
  console.log(response.data);
  return response.data;
}