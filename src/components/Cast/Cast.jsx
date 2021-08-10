import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    moviesAPI.fetchAboutActors(movieId).then(data => setCast(data.cast));
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {cast &&
        cast.map(({ id, profile_path, name, character }) => (
          <li className={styles.link} key={id}>
            {profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                alt={name}
              />
            ) : (
              <img src="" alt="No image" />
            )}
            <p>{name}</p>
            <p>{character}</p>
          </li>
        ))}
    </ul>
  );
};

export default Cast;
