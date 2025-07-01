import { useState, useEffect } from 'react';
import styles from './Entries.module.css';

function Entries({ year, month, onClick, entryList, normalizeDate }) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month+1, 0);
    const allDays = [];

    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      allDays.push(new Date(d));
    }

    setDays(allDays);
  }, [year, month]);

  return (
    <div className={styles.entries}>

      {days.map((date, i) => {
        const entry = entryList.find(
            (entry) =>
            normalizeDate(new Date(entry.date)) === normalizeDate(date)
        );

        const moodClass = entry ? styles[`${entry.mood}`] || '' : '';
        // const clickedDate = new Date(year, month, i + 1);
        return (
            <div
              key={i}
              onClick={() => {if (entry) onClick(entry);}}
              className={`${styles.entryBox} ${moodClass}`}
              title={date.toDateString()}
            >
              <p>{i+1}</p>
            </div>
          );})}
    </div>
  );
}

export default Entries;