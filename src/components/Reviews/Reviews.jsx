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
        {reviews.map(review => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    );
  }

  return <p>We don't have any reviews for this movie</p>;
};

export default Reviews;
