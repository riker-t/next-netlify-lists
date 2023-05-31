// ProfileListOverview.js
import styles from './ProfileListOverview.module.css';
import ProfileListGroup from './ProfileListGroup';



function ProfileListOverview({ groups }) {
    console.log(groups)
    return (
        <div className={styles.overview}>
            {groups.map(group => <ProfileListGroup key={group.title} {...group} />)}
        </div>
    )
}

export default ProfileListOverview;
