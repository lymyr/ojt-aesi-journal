import { Link } from "react-router-dom";
import Button from "./Button";
import styles from "./Header.module.css";
function Header( {onClick} ) {
    return (
        <>
        <header className={styles.header}>
            <div>
                <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.512"></g><g id="SVGRepo_iconCarrier"> <path d="M32 160L166.394 26.643a4.001 4.001 0 0 1 5.654.026l57.837 58.237a4.034 4.034 0 0 1-.007 5.676L97.348 223.59 32 224v-64zm16.797 5.594V208h40.488l121.92-121.396L180.57 56.56 64.656 175.772a3.937 3.937 0 0 1-5.624.037l-10.235-10.215z" fill-rule="evenodd"></path> </g></svg>
                <h1>JournaLite</h1>
            </div>
            <div>
                <Button className={styles.btn} text="Add Entry" onClick={onClick}/>
                <Link to="/"><p>Log Out</p></Link>
            </div>
        </header>
        </>
    );
}

export default Header;