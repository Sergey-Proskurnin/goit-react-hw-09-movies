import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import routes from 'routes';
import AppBar from 'components/AppBar';
import OnLoader from 'components/OnLoader';
import Container from 'components/Container';

const HomePage = lazy(() =>
  import('views/HomePage' /*webpackChunkName: "home-view" */),
);
const MoviesPage = lazy(() =>
  import('views/MoviesPage' /*webpackChunkName: "movies-view" */),
);
const MoviesDetailesPage = lazy(() =>
  import(
    'views/MoviesDetailesPage' /*webpackChunkName: "movies-detailes-view" */
  ),
);

function App() {
  return (
    <div className="App">
      <AppBar />
      <Container>
        <Suspense fallback={<OnLoader />}>
          <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <Route exact path={routes.movies} component={MoviesPage} />
            <Route path={routes.movieDetails} component={MoviesDetailesPage} />
            <Redirect to={routes.home} />
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
