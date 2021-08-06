const API_KEY = '669fe37c03d3daa74e87539ce9d57ec5';
const BASE_URL = 'https://api.themoviedb.org';
// Example API request = https://api.themoviedb.org/3/movie/550?api_key=669fe37c03d3daa74e87539ce9d57ec5

async function ApiService(url) {
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPopularMovies() {
  return ApiService(`${BASE_URL}/3/trending/all/day?api_key=${API_KEY}`);
}

export function fetchMoviesByQuery(query) {
  return ApiService(
    `${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`,
  );
}

export function fetchMovieDetails(movieId) {
  return ApiService(`${BASE_URL}/3//movie/${movieId}?api_key=${API_KEY}`);
}

export function fetchAboutActors(movieId) {
  return ApiService(
    `${BASE_URL}/3//movie/${movieId}/credits?api_key=${API_KEY}`,
  );
}

export function fetchReviews(movieId) {
  return ApiService(
    `${BASE_URL}/3//movie/${movieId}/reviews?api_key=${API_KEY}`,
  );
}
