import { Link } from "react-router-dom";
import Button from "./Button";
import styles from "./Header.module.css";
function Header( {onClick} ) {
    return (
        <>
        <header className={styles.header}>
            <h1>JournaLite</h1>
            <div>
                <Button className={styles.btn} text="Add Entry" onClick={onClick}/>
                <Link to="/"><p>Log Out</p></Link>
            </div>
        </header>
        </>
    );
}

export default Header;