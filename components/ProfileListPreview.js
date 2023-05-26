// ProfileListPreview.js
import { FaThumbsUp, FaBookmark } from 'react-icons/fa';
import styles from './ProfileListPreview.module.css';
import Link from 'next/link';

function ProfileListPreview({ id, name, image, likes, saves }) {
    const handleClick = () => {
        console.log(`List ${id} clicked.`);
    }

    return (
        <div className={styles.preview} onClick={handleClick}>
            <Link href='/404'>

                <img className={styles.image} src={image} alt={name} />
            </Link>
            <div className={styles.nameContainer}>

            </div>
            <div className={styles.info}>
                <div className={styles.name}>{name}</div>
                <div className={styles.stats}>
                    <div className={styles.stat}><FaThumbsUp /> {likes}</div>
                    <div className={styles.stat}><FaBookmark /> {saves}</div>
                </div>
            </div>
        </div>
    );
}

export default ProfileListPreview;
