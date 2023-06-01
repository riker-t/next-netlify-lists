// HeroNumber.js
import styles from './HeroNumber.module.css';

function HeroNumber({ number, label }) {
    return (
        <div className={styles['hero-number']}>
            <span className={styles.number}>{number}</span>
            <span className={styles.label}>{label}</span>
        </div>
    )
}

export default HeroNumber;
