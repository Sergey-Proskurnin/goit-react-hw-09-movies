import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import OnLoader from 'components/OnLoader';
import { fetchCastId } from 'services/fetchApi';
import { makeId } from 'components/slugId';
import sA from './animationCast.module.css';
import Cast from 'components/Cast';

export default function CastSection({ match }) {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onError, setOnError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const { movieId } = match.params;
    fetchCastId(makeId(movieId))
      .then(response => setCast(response.data.cast))
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
        <Cast cast={cast} />
      </CSSTransition>
    </>
  );
}
