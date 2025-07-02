import { useState, useEffect } from "react";
import axios from "axios";
import s from "./AddEntry.module.css";
import Button from "./Button";
import ModalView from "./ModalView";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;


function AddEntry({ edit = false, ref, setEntryList, editEntry = null, cDate, currentDate }) {
    const [date, setDate] = useState(currentDate);
    const [mood, setMood] = useState("");
    const [entry, setEntry] = useState("");
    const [clickedEdit, setclickedEdit] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    useEffect(() => {
        if (cDate === "NaN-NaN-NaN") {
            setDate(currentDate);
        } else if (edit && editEntry) {
            setDate(editEntry.date || cDate);
            setMood(editEntry.mood || "");
            setEntry(editEntry.journal_entry || "");
        } else {
            setDate(cDate)
        }
    }, [edit, editEntry, cDate]);

    function handleDelete() {
        if (!editEntry || !editEntry.id) {
            alert("No entry selected to delete.");
            return;
        }
        setPendingDeleteId(editEntry.id);
        setShowConfirmDialog(true);
    }

    function handleConfirmDelete() {
        setShowConfirmDialog(false);
        axios.delete(`/api/entries/${pendingDeleteId}`)
            .then(() => {
                ref?.current?.close();
                axios.get('/api/entries').then(r => setEntryList(r.data));
            })
            .catch(err => {
                console.error("Failed to delete entry:", err);
                alert("Delete failed.");
            });
    }

    function handleCancelDelete() {
        setShowConfirmDialog(false);
        setPendingDeleteId(null);
    }

    function handleSubmit(e) {
        e.preventDefault();
                axios.post('/api/entries', {
                mood: mood, 
                journal_entry: entry,
                date: date
            }).then(() => {
                ref?.current?.close();
                axios.get('/api/entries')
                    .then(r => setEntryList(r.data));
                setDate(currentDate);
                setMood("");
                setEntry("");
            }).catch(err => {
                console.error(err);
                alert('Failed to save journal entry.');
            });
    }


    return (
        <>
        <dialog className={s.dialog} ref={ref}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date:</label>
                    <input type="date" min='1900-01-01' max={currentDate} value={date} onChange={e => setDate(e.target.value)} required disabled={edit}/>
                </div>

                <fieldset>
                    <legend>How are you feeling today?</legend>
                    {["Horrible", "Bad", "Neutral", "Good", "Great"].map((label, index) => (
                        <label key={index}>
                        <input
                            type="radio"
                            name="mood"
                            value={label}
                            checked={mood === label}
                            onChange={e => setMood(e.target.value)}
                            required
                            disabled={edit && !clickedEdit}
                        />
                        {["😔", "☹️", "😐", "🙂", "🤩"][index]} {label}
                        </label>
                    ))}
                </fieldset>

                <div>
                    <label>Journal Entry</label>
                    <textarea
                        spellCheck="false"
                        placeholder='Write down your thoughts...'
                        value={entry}
                        onChange={e => setEntry(e.target.value)}
                        disabled={edit && !clickedEdit}
                    ></textarea>
                </div>

                <div>
                    <Button text="Close" type="button" onClick={() => {ref?.current?.close(); setclickedEdit(false);}} />

                    {edit? (clickedEdit? 
                                <>
                                <Button text="Delete" type="button" onClick={() => {handleDelete();}}/> 
                                <Button text="Save" />
                                </> 
                            : <Button text="Edit" type="button" onClick={() => setclickedEdit(true)}/>)
    
                        : <Button text="Submit"/>}
                </div>
            </form>
        </dialog>
        {edit===true? <ModalView 
    text="Are you sure you want to delete this entry?" 
    open={showConfirmDialog}
    onCancel={handleCancelDelete}
    onConfirm={handleConfirmDelete}
    setclickedEdit={setclickedEdit}
/>: null}

        </>
    );
    }

export default AddEntry;
