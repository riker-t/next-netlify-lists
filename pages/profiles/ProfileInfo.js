// ProfileInfo.js
import styles from './ProfileInfo.module.css';

function ProfileInfo({ image, name }) {
    return (
        <div className={styles['profile-info']}>
            <img className={styles['profile-photo']} src={image} alt={name} />
            <div className={styles['profile-name']}>{name}</div>
        </div>
    )
}

export default ProfileInfo;
