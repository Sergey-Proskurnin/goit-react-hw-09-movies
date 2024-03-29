import React, { useContext } from 'react';

import { BsArrowLeftShort } from 'react-icons/bs';

import contextProps from 'context/context';
import s from './MovieCard.module.css';

const MovieCard = () => {
  const {
    poster_path,
    title,
    release_date,
    vote_average,
    overview,
    genres,
    handleGoBack,
  } = useContext(contextProps);
  return (
    <div>
      <button className={s.BtnGoBack} type="button" onClick={handleGoBack}>
        {' '}
        <BsArrowLeftShort size="2em" />
        Go back
      </button>

      <div className={s.Card}>
        <div className={'ImgPoster'}>
          <img src={poster_path} alt={title} />
        </div>
        <div className={s.Description}>
          <h2>{`${title} (${release_date})`}</h2>
          <p>User Score: {vote_average * 10}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          {genres.length > 0 && <h3>Genres</h3>}
          {genres.length > 0 && genres.map(({ name }) => name).join(' ')}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
