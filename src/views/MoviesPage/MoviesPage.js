import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

import { fetchMovieWithQuery } from 'services/fetchApi';
import MoviesList from 'components/MoviesList';
import OnLoader from 'components/OnLoader';
import SearchFormMovies from 'components/SearchFormMovies';

const MoviesPage = ({ location, history }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [onError, setOnError] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get('query')) {
      setIsLoading(true);
      fetchMovieWithQuery(searchParams.get('query'))
        .then(response => {
          setMovies(response.data.results);
        })
        .catch(error => {
          setOnError(error.message);
          alert(`${onError}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [setIsLoading, onError, location.search]);

  const handleChange = e => {
    const { value } = e.currentTarget;
    setQuery(value);
    setMovies([]);
  };

  const onQueryChange = () => {
    history.push({
      pathname: location.pathname,
      search: `query=${query.trim()}`,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    fetchMovieWithQuery(query.trim())
      .then(response => {
        setMovies(response.data.results);
        onQueryChange();
      })
      .catch(error => {
        setOnError(error.message);
        alert(`${onError}`);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      <SearchFormMovies
        handleSubmit={handleSubmit}
        value={query}
        handleChange={handleChange}
      />
      {isLoading && <OnLoader />}
      <MoviesList movies={movies} />
    </>
  );
};

export default MoviesPage;

// static propTypes = {
//   location: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired,
// };

// export default class MoviesPage extends Component {
//   static propTypes = {
//     location: PropTypes.object.isRequired,
//     history: PropTypes.object.isRequired,
//   };

//   state = {
//     movies: [],
//     query: '',
//     isLoading: false,
//   };

//   componentDidMount() {
//     const searchParams = new URLSearchParams(this.props.location.search);

//     if (searchParams.get('query')) {
//       this.setState({ isLoading: true });
//       fetchMovieWithQuery(searchParams.get('query'))
//         .then(response => {
//           this.setState({ movies: response.data.results });
//         })
//         .catch(error => this.setState({ error }))
//         .finally(() => this.setState({ isLoading: false }));
//     }
//   }

//   handleChange = e => {
//     const { value } = e.currentTarget;
//     this.setState({ query: value, movies: [] });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.setState({ isLoading: true });
//     const { query } = this.state;
//     fetchMovieWithQuery(query.trim())
//       .then(response => {
//         this.setState({ movies: response.data.results });
//         this.onQueryChange();
//       })
//       .catch(error => this.setState({ error }))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   onQueryChange = () => {
//     const { history, location } = this.props;

//     history.push({
//       pathname: location.pathname,
//       search: `query=${this.state.query.trim()}`,
//     });
//   };

//   render() {
//     return (
//       <>
//         <SearchFormMovies
//           handleSubmit={this.handleSubmit}
//           value={this.state.query}
//           handleChange={this.handleChange}
//         />
//         {this.state.isLoading && <OnLoader />}
//         <MoviesList movies={this.state.movies} />
//       </>
//     );
//   }
// }
