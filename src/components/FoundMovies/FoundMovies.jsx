import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { fetchFilmByValue } from 'servises/API';
import { Link } from 'react-router-dom';
import styles from './FoundMovies.module.css';

const FoundMovies = () => {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      Notiflix.Notify.warning('Please enter a film name.');
      return;
    }
    setSubmittedQuery(query);
  };

  useEffect(() => {
    if (!submittedQuery.trim()) return;

    fetchFilmByValue(submittedQuery)
      .then(data => setSearchResults(data.results))
      .catch(err => {
        console.error('Error fetching films:', err);
        Notiflix.Notify.failure('Failed to load films. Please try again later.');
      });
  }, [submittedQuery]);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          name="name"
          value={query}
          onChange={handleChange}
          placeholder="Search films..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      <ul className={styles.movieList}>
        {searchResults.map(film => (
          <li key={film.id} className={styles.movieItem}>
            <Link to={`/movies/${film.id}`} className={styles.movieLink}>
              {film.title || film.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FoundMovies;
