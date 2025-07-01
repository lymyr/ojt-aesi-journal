import ContentHeader from "./ContentHeader";
import styles from "./View.module.css";

function View({ onClick, entryList, year, month, normalizeDate }) {
  const filteredEntries = entryList.filter((entry) => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getFullYear() === parseInt(year) &&
      entryDate.getMonth() === parseInt(month)
    );
  });

  return (
    <>
      <ContentHeader text="Results" />
      <div className={styles.container}>
        {filteredEntries.length === 0 ? (
          <div className={styles.noResults}>
            <h1>{new Date(year, month).toLocaleString("default", { month: "long" })} {year}</h1>
            <p>No results found...</p>
            </div>
        ) : (
          filteredEntries.map((entry, i) => (
            <div key={i} onClick={() => onClick(entry)}>
              <h2>{entry.mood}</h2>
              <div>
                <p>
                  <b>Date Created:</b> {normalizeDate(new Date(entry.date))}
                </p>
                <p>
                  <b>Date Updated:</b> {normalizeDate(new Date(entry.updated_at))}
                </p>
              </div>
              <p>{entry.journal_entry}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default View;
