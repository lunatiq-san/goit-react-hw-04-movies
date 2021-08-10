import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: 'home-page' */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /* webpackChunkName: 'movies-page' */),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage' /* webpackChunkName: 'not-found-page' */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage' /* webpackChunkName: 'movie-details-page' */
  ),
);

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
