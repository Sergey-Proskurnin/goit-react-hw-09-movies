import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Navigation from 'components/Navigation';
import s from './AppBar.module.css';
import headerStyles from './headerAppBar.module.css';
import navigationStyle from './navigationAppBar.module.css';

const AppBar = () => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames={headerStyles}
      unmountOnExit
    >
      {stage => {
        return (
          <header className={s.AppBar}>
            <CSSTransition
              in={stage === 'entered'}
              timeout={500}
              classNames={navigationStyle}
              unmountOnExit
            >
              <Navigation />
            </CSSTransition>
          </header>
        );
      }}
    </CSSTransition>
  );
};

export default AppBar;
