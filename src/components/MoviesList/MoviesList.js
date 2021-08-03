import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import s from './MoviesList.module.css';
import { makeIdSlug } from 'components/slugId';
import sA from './animationMoviesList.module.css';

const MoviesList = ({ movies, location }) => {
  return (
    <TransitionGroup component="ul" className="TaskList">
      {movies.map(film => (
        <CSSTransition key={film.id} timeout={850} classNames={sA}>
          <li key={film.id}>
            <NavLink
              className={s.NavLink}
              to={{
                pathname: `/movies/${makeIdSlug(
                  `${film.title || film.name} ${film.id}`,
                )}`,
                state: { from: location },
              }}
            >
              {film.title || film.name}.
            </NavLink>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
MoviesList.prototype = {
  movies: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(MoviesList);
