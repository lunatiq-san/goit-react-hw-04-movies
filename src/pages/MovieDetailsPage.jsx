import { useState, useEffect } from 'react';
import { Link, useParams, Route, useRouteMatch } from 'react-router-dom';
import * as moviesAPI from '../services/movies-api';
import { NavLink } from 'react-router-dom';
import CastPage from './CastPage';
import ReviewsPage from './ReviewsPage';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      <button onClick={() => {}}>Go Back</button>
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
                  <NavLink to={`${url}/cast`}>Cast</NavLink>
                </li>
                <li>
                  <NavLink to={`${url}/reviews`}>Reviews</NavLink>
                </li>
              </ul>

              <hr />
              <Route path={`${path}/cast`}>
                <CastPage />
              </Route>
              <Route path={`${path}/reviews`}>
                <ReviewsPage />
              </Route>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
