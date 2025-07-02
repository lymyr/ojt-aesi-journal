import { useState } from "react";
import s from "./ListView.module.css";

function ListView({ onClick, entryList }) {
    const [page, setPage] = useState(1);

    return (
        <>
        <div className={`${s.arrowContainer} ${s.top}`}>
            {page > 1 ? <button onClick={() => setPage(page-1)}>&lt;</button> : <button>&lt;</button>}
            <p>{page}</p>
            {page <= 5 ? <button onClick={() => setPage(page+1)}>&gt;</button> : <button>&gt;</button>}   
        </div>

        <table className={s.container}>
            <thead>
                <tr>
                    <th>Mood</th>
                    <th>Journal Entry</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {entryList.map((entry, i) => {
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


        <div className={s.arrowContainer}>
            {page > 1 ? <button onClick={() => setPage(page-1)}>&lt;</button> : <button>&lt;</button>}
            <p>{page}</p>
            {page <= 5 ? <button onClick={() => setPage(page+1)}>&gt;</button> : <button>&gt;</button>}   
        </div>
        </>
    );
}

export default ListView;
