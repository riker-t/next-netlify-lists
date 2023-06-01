
import ProfileList from "./ProfileList";
import styles from './ProfileLists.module.css'
function ProfileLists({ title, lists }) {

    return (

        <div className={styles.list}>
            {lists.map((list, index) => (
                <ProfileList key={list.refId} refId={list.refId} data={list.data} />
            ))}
        </div>
    )
}

export default ProfileLists;
