// ProfileListGroup.js
import styles from './ProfileListGroup.module.css';
import ProfileListPreview from './ProfileListPreview';

function ProfileListGroup({ title, lists }) {
    // console.log(lists)
    // console.log(lists.data)
    return (
        <div className={styles.group}>
            <div className={styles.header}>
                <div className={styles.title}>Popular</div>
                {/* <button className={styles.viewAll}>View All</button> */}
            </div>
            <div className={styles.list}>
                {lists.map((list, index) => (
                    <ProfileListPreview key={list.refId} refId={list.refId} data={list.data} />
                ))}
            </div>

            =
        </div>
    )
}


// {
//     items.map((item, index) => (
//         <Item key={item.ref['@ref'].id} item={item.data} index={index} onImageClick={handleImageClick} />
//     ))
// }
export default ProfileListGroup;
