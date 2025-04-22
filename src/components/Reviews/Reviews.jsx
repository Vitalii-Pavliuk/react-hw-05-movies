import { useEffect, useState } from "react";
import { fetchRewiews } from "servises/API";
import Notiflix from "notiflix";
import { useParams } from "react-router-dom";
import styles from "./Reviews.module.css";

export const Rewiews = () => {
  const { id } = useParams();
  const [filmRewiews, setFilmRewiews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchRewiews(id)
      .then((data) => {
        setFilmRewiews(data.results);
      })
      .catch((err) => {
        console.error("Error fetching film reviews:", err);
        Notiflix.Notify.failure(
          "Failed to load film reviews. Please try again later."
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      {loading && <p>Loading reviews...</p>}

      {!loading && filmRewiews?.length === 0 && (
        <p>No reviews available for this film.</p>
      )}

      {!loading && filmRewiews?.length > 0 && (
        <ul className={styles.reviewList}>
          {filmRewiews.map(({ id, author, content }) => (
            <li key={id} className={styles.reviewItem}>
              <h2 className={styles.reviewAuthor}>Author: {author}</h2>
              <p className={styles.reviewContent}>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Rewiews;
