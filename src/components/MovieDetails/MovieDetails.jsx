import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Notiflix from "notiflix"
import styles from "./MovieDetails.module.css"
import { fetchFilmDetails } from "servises/API"

export const MovieDetails = () => {
  const { id } = useParams()
  const [filmDetails, setFilmDetails] = useState(null)

  useEffect(() => {
    if (!id) return

    fetchFilmDetails(id)
      .then((data) => setFilmDetails(data))
      .catch((err) => {
        console.error("Error fetching film details:", err)
        Notiflix.Notify.failure(
          "Failed to load film details. Please try again later.",
        )
      })
  }, [id])
  return (
    <div>
      {filmDetails && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`}
            alt={filmDetails.title || filmDetails.name}
          />
          <h2>
            {filmDetails.title || filmDetails.name}{" "}
            {filmDetails.release_date
              ? `(${filmDetails.release_date.slice(0, 4)})`
              : ""}
          </h2>
          <p>User Score: {Math.round(filmDetails.vote_average * 10)}%</p>
          <p>{filmDetails.overview}</p>
          <h3>Genres</h3>
          <p>{filmDetails.genres.map(({ name }) => name).join(", ")}</p>
        </div>
      )}
    </div>
  )
}

export default MovieDetails
