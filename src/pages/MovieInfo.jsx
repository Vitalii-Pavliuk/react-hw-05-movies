import MovieDetails from "components/MovieDetails/MovieDetails";
import React from "react";
import { Link } from "react-router-dom";

export const MovieInfo = () => {

  return (
    <main>
      <h1>MOVIES</h1>
      <Link to={`/home`}>
        <button type="button">Go back</button>
      </Link>
    <MovieDetails />
    </main>
  );
};

export default MovieInfo;

