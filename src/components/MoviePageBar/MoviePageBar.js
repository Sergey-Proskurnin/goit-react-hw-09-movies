import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import s from './MoviePageBar.module.css';

const MoviePageBar = ({ match, location }) => {
  return (
    <section className={s.MovieBar}>
      <h4>Additional information</h4>
      <ul>
        <li>
          <NavLink
            exact
            to={{
              pathname: `${match.url}/cast`,
              state: { from: location.state?.from && location.state.from },
            }}
            className={s.NavLink}
            activeClassName="NavLink--active"
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{
              pathname: `${match.url}/reviews`,
              state: { from: location.state?.from && location.state.from },
            }}
            className={s.NavLink}
            activeClassName="NavLink--active"
          >
            Reviews
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default withRouter(MoviePageBar);
