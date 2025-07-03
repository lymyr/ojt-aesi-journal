import { useEffect } from "react";
import axios from "axios";
import styles from "./View.module.css";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

function View({ onClick, page, setPageView, pageView, sortOrder, refreshView }) {
  useEffect(() => {
    axios.get(`/api/entries?page=${page}&sort=${sortOrder}`)
      .then(res => setPageView(res.data))
      .catch(err => console.error("Failed to load entries:", err));
  }, [page, sortOrder, refreshView]);

  function normalizeDate(date) {
    return new Date(date).getFullYear() + '-' +
      String(new Date(date).getMonth() + 1).padStart(2, '0') + '-' +
      String(new Date(date).getDate()).padStart(2, '0');
  }

  return (
    <>
      <div className={styles.container}>
        {pageView.data.length === 0 ? (
          <div className={styles.noResults}>
            <p>No results found...</p>
          </div>
        ) : (
          pageView.data.map((entry, i) => (
            <div key={i} className={styles.entryBox} onClick={() => onClick(entry)}>
              <h2>{entry.mood}</h2>
              <div className={styles.dates}>
                <p><b>Date Created:</b> {normalizeDate(entry.date)}</p>
                <p><b>Date Updated:</b> {normalizeDate(entry.updated_at)}</p>
              </div>
              <p className={styles.journalText}>{entry.journal_entry}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default View;
