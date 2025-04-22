import MovieDetails from "components/MovieDetails/MovieDetails";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../components/MovieDetails/MovieDetails.module.css"

export const MovieInfo = () => {

  return (
    <main>
      <Link to={`/home`}>
        <button type="button" className={styles.backButton}>Go back</button>
      </Link>
    <MovieDetails />
    </main>
  );
};

export default MovieInfo;

