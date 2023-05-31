import styles from './SearchResultList.module.css';
import { useRouter } from 'next/router';
import { FaThumbsUp, FaBookmark } from 'react-icons/fa';


function SearchResultList({ list, refId }) {
    const router = useRouter();
    const {likesCount, savesCount, title, photoUrl} = list;


    const handleListClick = () => {
        router.push(`/lists/${refId}`);
    };
    return (
        <div className={styles.listContainer} onClick={handleListClick}>
            <div className={styles.imageContainer}>
                <img src={photoUrl} alt={title} className={styles.listImage} />
            </div>
            <div className={styles.listTitle}>{title}</div>
            <div className={styles.stats}>
                <div className={styles.stat}><FaThumbsUp /> {likesCount}</div>
                <div className={styles.stat}><FaBookmark /> {savesCount}</div>
            </div>
            {/* Add more fields if necessary */}
        </div>
    );
}

export default SearchResultList;
