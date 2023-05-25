import React from 'react';
import { FaRegSave, FaThumbsUp, FaRegCopy, FaCopy, FaBookmark } from 'react-icons/fa';
import styles from './ListHeader.module.css';

const ListHeader = ({ userIcon, listName, userName, listLink }) => {
    userIcon = 'https://media.licdn.com/dms/image/C4E03AQH8BQHbbYxnGw/profile-displayphoto-shrink_800_800/0/1563299356210?e=2147483647&v=beta&t=bwzNGxtWDYFGKx2sBPu7DUIht2ww5ZGwbLcJE30XBIk'
    userName = 'Teddy Riker'
    listName = 'Italy Trip'
    
    return (
        <div className={styles.metaContainer}>
            <div className={styles.user}>
                <img
                    className={styles.userIcon}
                    src={userIcon}
                    alt={userName}
                    onClick={() => console.log('User icon clicked')}
                />
                <div className={styles.userInfo}>
                    <p className={styles.listName}>{listName}</p>
                    <p className={styles.userName}>{userName}</p>
                </div>
            </div>
            <div className={styles.actionButtons}>
                <div className={styles.button} onClick={() => console.log('Save button clicked')}>
                    <FaBookmark />
                </div>
                <div className={styles.button} onClick={() => console.log('Thumbs up button clicked')}>
                    <FaThumbsUp />
                </div >
                <div className={styles.button} onClick={() => navigator.clipboard.writeText('https://main--glittery-monstera-cafd18.netlify.app/example_list')}>
                    <FaCopy />
                </div>
            </div>
        </div>
    );
};

export default ListHeader;
