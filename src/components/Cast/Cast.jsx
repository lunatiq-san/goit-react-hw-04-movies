import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    moviesAPI.fetchAboutActors(movieId).then(data => setCast(data.cast));
  }, [movieId]);

  return (
    <ul>
      {cast &&
        cast.map(({ id, profile_path, name, character }) => (
          <li key={id}>
            {profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                alt={name}
              />
            )}
            <p>{name}</p>
            <p>{character}</p>
          </li>
        ))}
    </ul>
  );
};

export default Cast;
