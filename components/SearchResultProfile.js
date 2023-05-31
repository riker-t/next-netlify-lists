import styles from './SearchResultProfile.module.css';
import { useRouter } from 'next/router';


function SearchResultProfile({ profile, refId }) {
    const router = useRouter();


    const handleProfileClick = () => {
        router.push(`/profiles/${refId}`);
    };
    return (
        <div className={styles.profileContainer} onClick={handleProfileClick}>
            <img src={profile.photoUrl} alt={profile.name} className={styles.profileImage} />
            <h2 className={styles.profileName}>{profile.name}</h2>
            {/* Add more fields if necessary */}
        </div>
    );
}

export default SearchResultProfile;
