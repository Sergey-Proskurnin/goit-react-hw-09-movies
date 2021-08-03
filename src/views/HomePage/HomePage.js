import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import OnLoader from 'components/OnLoader';
import { fetchTrendingDayMovie } from 'services/fetchApi';
import MoviesList from 'components/MoviesList';
import sA from './HomePage.module.css';

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onError, setOnError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchTrendingDayMovie()
      .then(response => {
        setFilms(response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        setOnError(error.message);
        onError && alert(`${onError}`);
      });
  }, [onError]);

  return (
    <>
      <CSSTransition
        in={true}
        appear={true}
        timeout={750}
        classNames={sA}
        unmountOnExit
      >
        <h1>Trending today</h1>
      </CSSTransition>

      {isLoading && <OnLoader />}
      <MoviesList movies={films} />
    </>
  );
};

export default HomePage;
// export default class HomePage extends Component {
//   state = {
//     films: [],
//     isLoading: false,
//   };

//   componentDidMount() {
//     this.setState({ isLoading: true });
//     fetchTrendingDayMovie()
//       .then(response =>
//         this.setState({ films: response.data.results, isLoading: false }),
//       )
//       .catch(error => this.setState({ error }));
//   }

//   render() {
//     return (
//       <>
//         <CSSTransition
//           in={true}
//           appear={true}
//           timeout={750}
//           classNames={sA}
//           unmountOnExit
//         >
//           <h1>Trending today</h1>
//         </CSSTransition>

//         {this.state.isLoading && <OnLoader />}
//         <MoviesList movies={this.state.films} />
//       </>
//     );
//   }
// }
