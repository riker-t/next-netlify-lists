import React from 'react';
import styles from './Item.module.css';

function Item({ item, index, onImageClick }) {
    const handleClick = () => {
        if (item.photoUrl) {
            onImageClick(index);
        }
    };
    return (
        <div className={styles.itemContainer}>
            {item.photoUrl &&
                <div className={styles.imageContainer} onClick={handleClick}>
                    <img
                        src={item.photoUrl}
                        alt={item.name}
                        className={styles.itemImage}
                    />
                </div>
            }
            <div className={styles.contentAndCtasContainer}>
                <div className={styles.itemContent}>
                    <div className={styles.itemName}>{item.name}</div>
                    {item.description && <div className={styles.itemDescription}>{item.description}</div>}
                    <div className={styles.itemCtasContainer}>
                        {item.ctas && item.ctas.map(cta => (
                            <a key={cta.title} href={cta.link} target="_blank" rel="noopener noreferrer" className={styles.itemCta}>
                                {cta.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;
