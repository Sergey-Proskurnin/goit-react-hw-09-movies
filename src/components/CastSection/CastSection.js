import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import OnLoader from 'components/OnLoader';
import { fetchCastId } from 'services/fetchApi';
import { makeId } from 'components/slugId';
import sA from './animationCast.module.css';
import Cast from 'components/Cast';

export class CastSection extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };
  state = {
    cast: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const { movieId } = this.props.match.params;
    fetchCastId(makeId(movieId))
      .then(response => this.setState({ cast: response.data.cast }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { cast } = this.state;
    return (
      <>
        {this.state.isLoading && <OnLoader />}
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
}

export default CastSection;
