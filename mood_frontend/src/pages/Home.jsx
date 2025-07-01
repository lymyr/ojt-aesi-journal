import { useRef, useState, useEffect } from "react";
import axios from "axios";
import AddEntry from "../components/AddEntry";
import ContentHeader from "../components/ContentHeader";
import Entries from "../components/Entries";
import FilterEntry from "../components/FilterEntry";
import Header from "../components/Header";
import View from "../components/View";
import s from "./Home.module.css";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function Home() {
  const dialogRef = useRef(null);
  const editRef = useRef(null);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth())
  const [entryList, setEntryList] = useState([]);

  const [selectedDate, setSelectedDate] = useState(normalizeDate(currentDate));
const handleOpenDialog = (date) => {
  setSelectedDate(normalizeDate(date));
  dialogRef.current?.showModal();
};

  const handleOpenEdit = (entry) => {
    setSelectedEntry(entry);
    editRef.current?.showModal();
  };
  
  function normalizeDate(date) {
    return new Date(date).getFullYear() + '-' +
      String(new Date(date).getMonth() + 1).padStart(2, '0') + '-' +
      String(new Date(date).getDate()).padStart(2, '0');
  }

  useEffect(() => {
    axios.get("/api/entries")
      .then(res => {
        setEntryList(res.data);
      })
      .catch(err => {
        console.error("Failed to load entries:", err);
      });
  }, []);


  return (
    <div className={s.container}>
      <Header onClick={handleOpenDialog} />
      <AddEntry ref={dialogRef} setEntryList={setEntryList} cDate={selectedDate}/> 
      <AddEntry edit={true} ref={editRef} setEntryList={setEntryList} editEntry={selectedEntry}/>
      <ContentHeader text="Visualize" />
      <FilterEntry year={year} month={month} setYear={setYear} setMonth={setMonth} cYear={currentDate.getFullYear()} cMonth={currentDate.getMonth()} />
      <Entries
  year={year}
  month={month}
  onClick={(date, entry) => entry ? handleOpenEdit(entry) : handleOpenDialog(date)}
  entryList={entryList}
  normalizeDate={normalizeDate}
/>

      <div className={s.view}>
        <View onClick={handleOpenEdit} normalizeDate={normalizeDate} entryList={entryList} year={year} month={month}/>
      </div>
    </div>
  );
}

export default Home;
