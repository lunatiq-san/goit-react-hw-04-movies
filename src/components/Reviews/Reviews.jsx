import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    moviesAPI.fetchReviews(movieId).then(data => setReviews(data.results));
  }, [movieId]);

  if (reviews && reviews.length > 0) {
    return (
      <ul>
        {reviews.map(({ id, author, content }) => (
          <li key={id}>
            <h3>{author}</h3>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    );
  }

  return <p>We don't have any reviews for this movie</p>;
};

export default Reviews;
