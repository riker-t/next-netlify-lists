import React from 'react';
import Item from './Item';
import styles from './ItemList.module.css'; // import css module

const ItemList = ({ data }) => (
    <div className={styles.itemListContainer}>
        {data.sections.map((section, index) => (
            <Section key={index} section={section} />
        ))}
    </div>
);

const Section = ({ section }) => (
    <div>
      <div className={styles.sectionTitle}>{section.title}</div>
      {section.items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
  

export default ItemList;
