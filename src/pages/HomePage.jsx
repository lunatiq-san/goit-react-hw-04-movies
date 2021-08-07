import { useEffect, useState } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import * as moviesAPI from '../services/movies-api';

const HomePage = () => {
  const { pathname } = useLocation();
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesAPI.fetchPopularMovies().then(data => setMovies(data.results));
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: {
                    backUrl: pathname,
                  },
                }}
              >
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HomePage;
