    // ProfileListGroup.js
import styles from './ProfileListGroup.module.css';
import ProfileListPreview from './ProfileListPreview';

function ProfileListGroup({ title, lists }) {
    return (
        <div className={styles.group}>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                {/* <button className={styles.viewAll}>View All</button> */}
            </div>
            <div className={styles.list}>
                {lists.map(list => <ProfileListPreview key={list.id} {...list} />)}
            </div>
        </div>
    )
}

export default ProfileListGroup;
