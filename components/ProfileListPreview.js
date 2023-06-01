// ProfileListPreview.js
import { FaThumbsUp, FaBookmark } from 'react-icons/fa';
import styles from './ProfileListPreview.module.css';
import Link from 'next/link';

function ProfileListPreview({ refId, data }) {
    const { title, photoUrl, likesCount, savesCount } = data
    // console.log(refId)
    // console.log(data)
    // const handleClick = () => {
    //     console.log(`List ${id} clicked.`);
    // }

    return (
        <div className={styles.preview}>
            <Link href={`/lists/${refId}`}>

                <img className={styles.image} src={photoUrl} alt={name} />
            </Link>
            <div className={styles.nameContainer}>

            </div>
            <div className={styles.info}>
                <div className={styles.name}>{title}</div>
                <div className={styles.stats}>
                    <div className={styles.stat}><FaThumbsUp /> {likesCount}</div>
                    <div className={styles.stat}><FaBookmark /> {savesCount}</div>
                </div>
            </div>
        </div>
    );
}

export default ProfileListPreview;
