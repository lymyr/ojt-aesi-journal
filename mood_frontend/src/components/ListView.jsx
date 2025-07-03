import { useEffect } from "react";
import axios from "axios";
import s from "./ListView.module.css";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

function ListView({ onClick, page, pageView, setPageView, sortOrder, refreshView }) {
    useEffect(() => {
        axios.get(`/api/entries?page=${page}&sort=${sortOrder}`)
        .then(res => {
            setPageView(res.data);
        })
        .catch(err => {
            console.error("Failed to load entries:", err);
        });
    }, [page, sortOrder, refreshView]);

    return (
        <>
        <table className={s.container}>
            <thead>
                <tr>
                    <th>Mood</th>
                    <th>Journal Entry</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {pageView.data.map((entry, i) => {
                    const moodClass = entry.mood.toLowerCase();
                    return (
                    <tr key={i} onClick={() => onClick(entry)}>
                        <td className={s[moodClass]}>{entry.mood}</td>
                        <td>{entry.journal_entry}</td>
                        <td>{entry.date}</td>
                    </tr>);
                })}
            </tbody>
        </table>
        </>
    );
}

export default ListView;
