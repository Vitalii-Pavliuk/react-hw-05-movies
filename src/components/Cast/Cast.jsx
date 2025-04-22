import { useEffect, useState } from "react"
import { fetchCast } from "servises/API"
import Notiflix from "notiflix"
import { useParams } from "react-router-dom"
import styles from "./Cast.module.css"

export const Cast = () => {
  const { id } = useParams()
  const [filmCast, setfilmCast] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    setLoading(true);
    fetchCast(id)
      .then((data) => setfilmCast(data.cast))
      .catch((err) => {
        console.error("Error fetching film details:", err)
        Notiflix.Notify.failure(
          "Failed to load film details. Please try again later.",
        );
      })
      .finally(() => setLoading(false));
  }, [id])


  return (
    <>
      {loading && <p>Loading reviews...</p>}

      {!loading && filmCast?.length === 0 && (
        <p>No reviews available for this film.</p>
      )}

      {!loading && filmCast?.length > 0 && (
        <ul className={styles.castList}>
          {filmCast.map(({ id, name, character, profile_path }) => (
            <li key={id} className={styles.castItem}>
              <img
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                alt={name}
                className={styles.castImage}
              />
              <h2 className={styles.castName}>{name}</h2>
              <p className={styles.castCharacter}>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Cast
