import styles from "./FilterEntry.module.css";
function FilterEntry({setYear, setMonth, year, cYear, cMonth, month}) {
    return (
        <form action="" className={styles.form}>
            <div>
                <label>Filter by:</label>
                <div>
                    <input value={year} onChange={(e) => setYear(Number(e.target.value))} placeholder={year} type="number" min="1900" max={cYear} ></input>
                    
                    <select
  onChange={(e) => setMonth(Number(e.target.value))}
  value={month}
>
  <option value="">Select Month</option>
  {Array.from({ length: year === cYear ? cMonth + 1 : 12 }, (_, i) => (
    <option key={i} value={i}>
      {new Date(0, i).toLocaleString("default", { month: "long" })}
    </option>
  ))}
</select>

                </div>
            </div>
        </form>
    );
}

export default FilterEntry;