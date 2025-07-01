import styles from './Button.module.css';

function Button ({text, className, onClick, type}) {
    return (
        <button type={type} onClick={onClick} className={`${styles.btn} ${className || ''}`}>{text}</button>
    );
}

export default Button;