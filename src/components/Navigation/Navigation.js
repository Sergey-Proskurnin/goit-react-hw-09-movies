import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from 'routes';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <ul className={s.listNav}>
      <li className={s.ItemNav}>
        <NavLink
          exact
          to={routes.home}
          className={s.NavLink}
          activeClassName="NavLink--active"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={routes.movies}
          className={s.NavLink}
          activeClassName="NavLink--active"
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
