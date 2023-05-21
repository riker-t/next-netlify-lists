import React from 'react';
import Item from './Item';
import styles from './ItemList.module.css'; // import css module

function ItemList({ items }) {
    return (
        <div className={styles.listContainer}>
            {items.map(item => <Item key={item.id} item={item} />)}
        </div>
    );
}

export default ItemList;
