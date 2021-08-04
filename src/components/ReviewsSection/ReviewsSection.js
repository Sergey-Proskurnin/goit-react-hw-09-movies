import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import OnLoader from 'components/OnLoader';
import { fetchReviewsId } from 'services/fetchApi';
import { makeId } from 'components/slugId';
import sA from './animationReviews.module.css';
import Reviews from 'components/Reviews';

export default function ReviewsSection({ match }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onError, setOnError] = useState(null);

  useEffect(() => {
    const { movieId } = match.params;
    setIsLoading(true);
    fetchReviewsId(makeId(movieId))
      .then(response => setReviews(response.data.results))
      .catch(error => {
        setOnError(error.message);
        alert(onError);
      })
      .finally(() => setIsLoading(false));
  }, [match.params, onError]);

  return (
    <>
      {isLoading && <OnLoader />}
      <CSSTransition
        in={true}
        appear={true}
        timeout={350}
        classNames={sA}
        unmountOnExit
      >
        <Reviews reviews={reviews} />
      </CSSTransition>
    </>
  );
}
