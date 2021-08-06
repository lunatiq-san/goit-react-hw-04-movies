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
    <>
      {cast &&
        cast.map(actor => (
          <li key={actor.id}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
              />
            )}
            <p>{actor.name}</p>
            <p>{actor.character}</p>
          </li>
        ))}
    </>
  );
};

export default Cast;
