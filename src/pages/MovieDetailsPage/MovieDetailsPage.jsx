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
      <button onClick={handleGoBack}>Go Back</button>
      {movie && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
          />
          <div>
            <h1>{movie.title}</h1>
            <p>User Score: {movie.vote_average * 10}%</p>

            <h2>Overview</h2>
            <p>{movie.overview}</p>

            <h2>Genres</h2>
            <p>{movie.genres.map(genre => `${genre.name} `)}</p>

            <div>
              <h3>Additional information</h3>
              <ul>
                <li>
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
                <li>
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

              <hr />
              <Suspense fallback={<h1>Loading...</h1>}>
                <Route path={`${path}/cast`}>
                  <Cast />
                </Route>
                <Route path={`${path}/reviews`}>
                  <Reviews />
                </Route>
              </Suspense>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
