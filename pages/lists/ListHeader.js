import React from 'react';
import { FaRegSave, FaThumbsUp, FaRegCopy, FaCopy, FaBookmark } from 'react-icons/fa';
import styles from './ListHeader.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';


const ListHeader = ({ listName, profileIcon, profileName, profileId }) => {
    const router = useRouter();

    const handleProfileClick = () => {
        router.push(`/profiles/${profileId}`);
    };

    // console.log(`profileId:${profileId}`)

    return (
        <div className={styles.metaContainer}>
            <div className={styles.user} onClick={handleProfileClick}>
                <img
                    className={styles.userIcon}
                    src={profileIcon}
                    alt={profileName}
                />
                <div className={styles.userInfo}>
                    <p className={styles.listName}>{listName}</p>
                    <p className={styles.userName}>{profileName}</p>
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
