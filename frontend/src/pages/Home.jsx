import { useRef, useState, useEffect } from "react";
import axios from "axios";
import AddEntry from "../components/AddEntry";
import ContentHeader from "../components/ContentHeader";
import Entries from "../components/Entries";
import FilterEntry from "../components/FilterEntry";
import Header from "../components/Header";
import View from "../components/View";
import ListView from "../components/ListView";
import s from "./Home.module.css";
import Button from "../components/Button";
import PageControls from "../components/PageControls";

axios.defaults.baseURL = 'http://localhost:8000';

function Home() {
  const dialogRef = useRef(null);
  const editRef = useRef(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [paginationView, setPaginationView] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");

  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth())
  const [refreshView, setRefreshView] = useState(false);

  const [page, setPage] = useState(1);
  const [pageView, setPageView] = useState({ data: [], last_page: 1 });

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
    axios.get("/api/moods")
      .then(res => {
        setMoods(res.data);
      })
      .catch(err => {
        console.error("Failed to load moods:", err);
      });
  }, []);


  return (
    <div className={s.container}>
      <Header onClick={handleOpenDialog} />
      <AddEntry ref={dialogRef}  cDate={selectedDate} currentDate={normalizeDate(currentDate)} page={page} setPageView={setPageView} setRefreshView={setRefreshView}/> 
      <AddEntry edit={true} ref={editRef} editEntry={selectedEntry} page={page} setPageView={setPageView} setRefreshView={setRefreshView}/>
      <ContentHeader text="Visualize" />
      <FilterEntry year={year} month={month} setYear={setYear} setMonth={setMonth} cYear={currentDate.getFullYear()} cMonth={currentDate.getMonth()} currentDate={normalizeDate(currentDate)}/>
      <Entries year={year} month={month} onClick={(date, entry) => entry ? handleOpenEdit(entry) : handleOpenDialog(date)} normalizeDate={normalizeDate} refreshView={refreshView} />
      <ContentHeader text="All Entries" />
      <div className={s.controlContainer}>
            <select value={selectedMood} onChange={e => {setSelectedMood(e.target.value); setPage(1);}}>
              <option value="">All Moods</option>
              {moods.map((mood, i) => (
                <option key={i} value={mood}>{mood}</option>))}
            </select>

            <Button text={sortOrder === "asc" ? "Date Descending" : "Date Ascending"} onClick={() => {setSortOrder(sortOrder === "asc" ? "desc" : "asc"); setPage(1);}} />
            <Button paginationView text={paginationView ? "Old View" : "New View"} onClick={() => setPaginationView(!paginationView)}/>
      </div>
      <div className={s.view}>
        <PageControls setPage={setPage} page={page} pageView={pageView}/>
        {paginationView ? (
            <ListView onClick={handleOpenEdit} page={page} setPageView={setPageView} pageView={pageView} sortOrder={sortOrder} refreshView={refreshView} selectedMood={selectedMood} />
            ) : (
            <View onClick={handleOpenEdit} page={page} setPageView={setPageView} pageView={pageView} sortOrder={sortOrder} refreshView={refreshView} selectedMood={selectedMood} />)}
        <PageControls setPage={setPage} page={page} pageView={pageView}/>
      </div>
    </div>
  );
}

export default Home;
