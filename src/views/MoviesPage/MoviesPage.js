import React, { useEffect, useState } from 'react';

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
