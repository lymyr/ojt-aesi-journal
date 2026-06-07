import { useState, useEffect } from 'react';
import styles from './Entries.module.css';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

function Entries({ year, month, onClick, normalizeDate, refreshView }) {
  const [days, setDays] = useState([]);
  const [monthlyEntries, setMonthlyEntries] = useState([]);

  useEffect(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const allDays = [];
    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      allDays.push(new Date(d));
    }
    setDays(allDays);



    let apiMonth = Number(month) + 1;
    if (apiMonth < 10) {
      apiMonth = '0' + apiMonth;
    }
    axios.get(`/api/entries/month/${year}-${apiMonth}`)
      .then(res => {
        setMonthlyEntries(res.data);
      })
      .catch(err => {
        console.error("Failed to load entries:", err);
      });
  }, [year, month, refreshView]);

  

  return (
    <div className={styles.entries}>
      {days.map((date, i) => {
        const entry = monthlyEntries.find(
          (entry) => normalizeDate(new Date(entry.date)) === normalizeDate(date));

        const moodClass = entry ? styles[`${entry.mood}`] || '' : '';
        return (
          <div
            key={i}
            onClick={() => onClick(date, entry)}
            className={`${styles.entryBox} ${moodClass}`}
            title={date.toDateString()}
          >
            <p>{i + 1}</p>
          </div>
        );
      })}
    </div>
  );
}


export default Entries;