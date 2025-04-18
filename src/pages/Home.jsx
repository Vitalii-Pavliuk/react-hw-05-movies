import { useEffect, useState } from 'react';
import { fetchPopularFilms } from '../servises/API';
import Notiflix from "notiflix"
import { Link } from 'react-router-dom';

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
    <main>
      <h1>HOME</h1>

      <ul>
        {films.map(film => (
          <li key={film.id}>
          <Link to={`/movies/${film.id}`}>
            {film.title || film.name}
          </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
