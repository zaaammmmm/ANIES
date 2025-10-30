import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

export const jikanApi = axios.create({
  baseURL: BASE_URL,
});

// Top anime
export const getTopAnime = async (page = 1, limit = 20) => {
  try {
    const response = await jikanApi.get(`/top/anime?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top anime:', error);
    throw error;
  }
};

// Anime details
export const getAnimeDetails = async (id) => {
  try {
    const response = await jikanApi.get(`/anime/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    throw error;
  }
};

// Anime episodes
export const getAnimeEpisodes = async (id, page = 1) => {
  try {
    const response = await jikanApi.get(`/anime/${id}/episodes?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime episodes:', error);
    throw error;
  }
};

// Search anime
export const searchAnime = async (query, page = 1, limit = 20) => {
  try {
    const response = await jikanApi.get(`/anime?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

// Anime schedules
export const getAnimeSchedules = async (day) => {
  try {
    const dayParam = day ? `?filter=${day}` : '';
    const response = await jikanApi.get(`/schedules${dayParam}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime schedules:', error);
    throw error;
  }
};

// Anime genres
export const getAnimeGenres = async () => {
  try {
    const response = await jikanApi.get('/genres/anime');
    return response.data;
  } catch (error) {
    console.error('Error fetching anime genres:', error);
    throw error;
  }
};

// Anime by genre
export const getAnimeByGenre = async (genreId, page = 1, limit = 20) => {
  try {
    const response = await jikanApi.get(`/anime?genres=${genreId}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime by genre:', error);
    throw error;
  }
};
