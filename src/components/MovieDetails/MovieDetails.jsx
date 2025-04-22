import React, { Suspense, useEffect, useState } from "react"
import { NavLink, Outlet, useParams } from "react-router-dom"
import Notiflix from "notiflix"
import { fetchFilmDetails } from "servises/API"
import styles from "./MovieDetails.module.css"

export const MovieDetails = () => {
  const { id } = useParams()
  const [filmDetails, setFilmDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    setLoading(true);
    fetchFilmDetails(id)
      .then((data) => setFilmDetails(data))
      .catch((err) => {
        console.error("Error fetching film details:", err)
        Notiflix.Notify.failure(
          "Failed to load film details. Please try again later.",
        )
      })
  .finally(() => setLoading(false));
  }, [id])
  return (
    <>
      {loading && <p>Loading reviews...</p>}

      {!loading && !filmDetails && (
        <p>Sorry, we don't have any information about this film.</p>
      )}
      <div className={styles.container}>
        {filmDetails && (
          <div className={styles.wrapper}>
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`}
              alt={filmDetails.title || filmDetails.name}
            />
            <div className={styles.details}>
              <h2 className={styles.title}>
                {filmDetails.title || filmDetails.name}{" "}
                {filmDetails.release_date
                  ? `(${filmDetails.release_date.slice(0, 4)})`
                  : ""}
              </h2>
              <p className={styles.score}>
                User Score: {Math.round(filmDetails.vote_average * 10)}%
              </p>
              <p className={styles.overview}>{filmDetails.overview}</p>
              <h3>Genres</h3>
              <p className={styles.genres}>
                {filmDetails.genres.map(({ name }) => name).join(", ")}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={styles.additionalInfo}>
        <h3>Additional information</h3>
        <ul className={styles.additionalInfoList}>
          <li>
            <NavLink to="cast" className={styles.infoLink}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={styles.infoLink}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default MovieDetails
