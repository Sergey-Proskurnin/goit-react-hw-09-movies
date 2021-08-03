import React from 'react';
import PropTypes from 'prop-types';

import s from './SearchFormMovies.module.css';

const SearchFormMovies = ({ handleSubmit, value, handleChange }) => {
  return (
    <form className={'form'} onSubmit={handleSubmit}>
      <label htmlFor={''} className="lable">
        <input
          className={s.input}
          type="text"
          value={value}
          onChange={handleChange}
          id={''}
        />
      </label>

      <button className={s.button} type="submit">
        Search
      </button>
    </form>
  );
};

SearchFormMovies.prototype = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
export default SearchFormMovies;
