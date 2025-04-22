import { useEffect, useState } from 'react';
import { fetchPopularFilms } from '../servises/API';
import Notiflix from "notiflix"
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export const Home = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchPopularFilms()
      .then(data => setFilms(data))
      .catch(err => {
        console.error('Error fetching popular films:', err);
        Notiflix.Notify.failure('Failed to load films. Please try again later.');
      });
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Trending</h1>

      <ul className={styles.filmList}>
        {films.map(film => (
          <li key={film.id} className={styles.filmItem}>
            <Link to={`/movies/${film.id}`} className={styles.filmLink}>
              {film.title || film.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
