import React from 'react';
import { FaLink } from 'react-icons/fa';
import styles from './Item.module.css';

function Item({ item }) {
    return (
        <div className={styles.itemContainer}>
            {item.photoUrl && 
                <div className={styles.imageContainer}>
                    <img 
                        src={item.photoUrl} 
                        alt={item.name}
                        className={styles.itemImage}
                    />
                </div>
            }
            <div className={styles.contentAndLinkContainer}>
                <div className={styles.itemContent}>
                    <div className={styles.itemName}>{item.name}</div>
                    {item.description && <p className={styles.itemDescription}>{item.description}</p>}
                    <div className={styles.itemTagContainer}>
                        {item.tags && item.tags.map(tag => <span key={tag} className={styles.itemTag}>{tag}</span>)}
                    </div>
                </div>
                {item.link && 
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.itemLink}>
                        <FaLink /> 
                    </a>
                }
            </div>
        </div>
    );
}

export default Item;
