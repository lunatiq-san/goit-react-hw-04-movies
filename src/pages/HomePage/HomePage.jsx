import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';

const HomePage = () => {
  const { pathname } = useLocation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesAPI.fetchPopularMovies().then(data => setMovies(data.results));
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {movies &&
          movies.map(({ id, title, name }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: {
                    backUrl: pathname,
                  },
                }}
              >
                {title || name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HomePage;
