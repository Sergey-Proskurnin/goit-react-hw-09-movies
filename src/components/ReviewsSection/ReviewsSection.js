import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import OnLoader from 'components/OnLoader';
import { fetchReviewsId } from 'services/fetchApi';
import { makeId } from 'components/slugId';
import sA from './animationReviews.module.css';
import Reviews from 'components/Reviews';

export class ReviewsSection extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  state = {
    reviews: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const { movieId } = this.props.match.params;
    fetchReviewsId(makeId(movieId))
      .then(response => this.setState({ reviews: response.data.results }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { reviews } = this.state;
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
          <Reviews reviews={reviews} />
        </CSSTransition>
      </>
    );
  }
}

export default ReviewsSection;
