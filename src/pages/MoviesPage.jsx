import { useState, useEffect } from 'react';
import * as moviesAPI from '../services/movies-api';
import qs from 'query-string';

const MoviesPage = () => {
  const [query, setQuery] = useState('');

  // useEffect(() => {
  //   moviesAPI.fetchMoviesByQuery(query).then(data => console.log(data));
  // }, [query]);

  const handleChange = event => {
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    moviesAPI.fetchMoviesByQuery(query).then(data => console.log(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        value={query}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default MoviesPage;
