import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import styles from './SearchBar.module.css';
import { fetchFilmByValue } from 'servises/API';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [submittedQuery, setSubmittedQuery] = useState('');

  useEffect(() => {
    if (!submittedQuery.trim()) return;

    fetchFilmByValue(submittedQuery)
      .then(data => setSearchResults(data.results))
      .catch(err => {
        console.error('Error fetching films:', err);
        Notiflix.Notify.failure('Failed to load films. Please try again later.');
      });
  }, [submittedQuery]);

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

  return (
    <form onSubmit={handleSubmit} className={styles.SearchBarForm}>
      <input
        type="text"
        name="name"
        value={query}
        onChange={handleChange}
        className={styles.SearchBarInput}
        placeholder="Search films..."
      />
      <button type="submit" className={styles.SearchBarButton}>
        Search
      </button>

      {/* Можеш тут вставити відображення результатів, якщо потрібно */}
      {/* <ul>
        {searchResults.map(film => (
          <li key={film.id}>{film.title || film.name}</li>
        ))}
      </ul> */}
    </form>
  );
};


export default SearchBar;

