import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
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

export default class MoviesDetailesPage extends Component {
  static defaultProps = {
    isLoading: false,
    poster_path: null,
    vote_average: null,
    title: null,
    genres: [],
    overview: null,
    release_date: null,
  };

  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    poster_path: PropTypes.string,
    vote_average: PropTypes.string,
    title: PropTypes.string,
    genres: PropTypes.array,
    overview: PropTypes.string,
    release_date: PropTypes.string,
  };

  state = {
    isLoading: this.isLoading,
    poster_path: this.poster_path,
    vote_average: this.vote_average,
    title: this.title,
    genres: this.genres,
    overview: this.overview,
    release_date: this.release_date,
    handleGoBack: () => {
      const { location, history } = this.props;
      // history.push(location?.state?.from || routes.home);
      if (location.state && location.state.from) {
        return history.push(location.state.from);
      }
      history.push(routes.home);
    },
  };

  slugId = id => id.match(/[a-zA-Z0-9]+$/)[0];

  componentDidMount() {
    this.setState({ isLoading: true });
    const { movieId } = this.props.match.params;
    fetchMovieId(makeId(movieId))
      .then(response =>
        this.setState({
          ...response.data,
          poster_path: `https://image.tmdb.org/t/p/w300${
            response.data.poster_path && response.data.poster_path
          }`,
          release_date: response.data.release_date.slice(0, 4),
          isLoading: false,
        }),
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { match } = this.props;
    const { poster_path } = this.state;

    return (
      <contextProps.Provider value={this.state}>
        <>
          {this.state.isLoading && <OnLoader />}
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
                  <MoviePageBar
                  // locationSearch={this.props.location.state.from}
                  />{' '}
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
  }
}
