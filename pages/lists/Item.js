import React from 'react';
import styles from './Item.module.css';
const THUMBIO_KEY='67857-Lists'

function Item({ item, index, onImageClick }) {
    const handleClick = () => {
        if (item.photoUrl || item.linkUrl) {
            onImageClick(index);
        }
    };
    return (
        <div className={styles.itemContainer}>
            {(item.photoUrl || item.linkUrl) &&
                <div className={styles.imageContainer} onClick={handleClick}>
                    <img
                        src={item.photoUrl || `https://image.thum.io/get/auth/${THUMBIO_KEY}/${item.linkUrl}`}
                        alt={item.name}
                        className={styles.itemImage}
                    />
                </div>
            }
            <div className={styles.contentAndCtasContainer}>
                <div className={styles.itemName}>{item.name}</div>
                {item.description && <div className={styles.itemDescription}>{item.description}</div>}
                {item.linkUrl &&
                    <div className={styles.itemCtasContainer}>
                        <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" className={styles.itemCta}>
                            Link
                        </a>
                    </div>
                }
            </div>
        </div>
    );
}

export default Item;
