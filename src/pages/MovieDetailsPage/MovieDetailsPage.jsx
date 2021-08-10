import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Link,
  useParams,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';

import styles from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: 'cast' */),
);
const Reviews = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: 'reviews' */),
);

const MovieDetailsPage = () => {
  const { state } = useLocation();
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  const history = useHistory();

  useEffect(() => {
    moviesAPI.fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const handleGoBack = () => {
    if (state?.query) {
      history.push({
        pathname: state?.backUrl || '/',
        search: `query=${state.query}`,
      });
      return;
    }

    if (!state?.query && state?.backUrl) {
      history.push({
        pathname: state.backUrl,
      });
      return;
    }

    history.push({
      pathname: '/',
    });
  };

  return (
    <>
      <button className={styles.btn} onClick={handleGoBack}>
        Go Back
      </button>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <p>User Score: {movie.vote_average * 10}%</p>
          <div className={styles.imageWrapper}>
            <img
              className={styles.img}
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h2>Overview</h2>
              <p>{movie.overview}</p>

              <h2>Genres</h2>
              <p>{movie.genres.map(genre => `${genre.name} `)}</p>
            </div>
          </div>
          <div>
            <h3>Additional information</h3>
            <ul className={styles.list}>
              <li className={styles.link}>
                <Link
                  to={{
                    pathname: `${url}/cast`,
                    state: {
                      backUrl: state.backUrl,
                      query: state.query,
                    },
                  }}
                >
                  Cast
                </Link>
              </li>
              <li className={styles.link}>
                <Link
                  to={{
                    pathname: `${url}/reviews`,
                    state: {
                      backUrl: state?.backUrl || '/',
                      query: state?.query || '',
                    },
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>

            <Suspense fallback={<h1>Loading...</h1>}>
              <Route path={`${path}/cast`}>
                <Cast />
              </Route>
              <Route path={`${path}/reviews`}>
                <Reviews />
              </Route>
            </Suspense>
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
