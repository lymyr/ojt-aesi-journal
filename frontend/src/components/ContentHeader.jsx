import styles from "./ContentHeader.module.css";

function ContentHeader({text}) {
    return (
        <h1 className={styles.header}>{text}</h1>
    ); 
}

export default ContentHeader;