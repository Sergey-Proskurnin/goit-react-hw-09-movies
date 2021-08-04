import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { fetchMovieId } from 'services/fetchApi';
import routes from 'routes';
import MoviePageBar from 'components/MoviePageBar';
import MovieCard from 'components/MovieCard';
import contextProps from 'context/context';
import OnLoader from 'components/OnLoader';
import { makeId } from 'components/slugId';
import sA from './MoviesDetailesPage.module.css';

const CastSection = lazy(() =>
  import('components/CastSection' /*webpackChunkName: "cast-view" */),
);
const ReviewsSection = lazy(() =>
  import('components/ReviewsSection' /*webpackChunkName: "reviews-view" */),
);

const MoviesDetailesPage = ({ location, history, match }) => {
  const initialState = {
    isLoading: false,
    poster_path: null,
    vote_average: null,
    title: null,
    genres: [],
    overview: null,
    release_date: null,
  };

  const [state, setState] = useState(initialState);

  const handleGoBack = () => {
    history.push(location?.state?.from || routes.home);
    // if (location.state && location.state.from) {
    //   return history.push(location.state.from);
    // }
    // history.push(routes.home);
  };

  useEffect(() => {
    const { movieId } = match.params;
    setState(prev => ({
      ...prev,
      isLoading: true,
    }));
    fetchMovieId(makeId(movieId))
      .then(response =>
        setState(prev => ({
          ...prev,
          ...response.data,
          poster_path: `https://image.tmdb.org/t/p/w300${
            response.data.poster_path && response.data.poster_path
          }`,
          release_date: response.data.release_date.slice(0, 4),
          isLoading: false,
        })),
      )
      .catch(error => setState(prev => ({ ...prev, error, isLoading: false })));
  }, [match.params]);

  const { poster_path } = state;

  return (
    <contextProps.Provider value={{ ...state, handleGoBack }}>
      <>
        {state.isLoading && <OnLoader />}
        {poster_path ? (
          <>
            <CSSTransition
              in={true}
              appear={true}
              timeout={250}
              classNames={sA}
              unmountOnExit
            >
              <div>
                <MovieCard />
                <MoviePageBar />{' '}
              </div>
            </CSSTransition>
            <Suspense fallback={<OnLoader />}>
              <Switch>
                <Route
                  exact
                  path={`${match.path}/cast`}
                  component={CastSection}
                />
                <Route
                  exact
                  path={`${match.path}/reviews`}
                  component={ReviewsSection}
                />
              </Switch>
            </Suspense>
          </>
        ) : (
          <p>We don't have any description for this movie.</p>
        )}
      </>
    </contextProps.Provider>
  );
};

export default MoviesDetailesPage;
