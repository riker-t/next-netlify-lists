import React, { useState } from 'react';
import Item from '../pages/lists/Item';
import ItemListActionBar from './ItemListActionBar';
import ListHeader from './ListHeader';
import GalleryView from '../pages/lists/GalleryView';
import styles from './ItemListSections.module.css'; 

const ItemListSections = ({ data }) => {
  const [galleryView, setGalleryView] = useState({ isOpen: false, index: null });
  const images = data.sections.flatMap(section => section.items);

  const handleImageClick = index => {
    setGalleryView({ isOpen: true, index });
  };

  const handleCloseGallery = () => {
    setGalleryView({ isOpen: false, index: null });
  };

  return (
    <div className={styles.itemListContainer}>
      <ListHeader />
      {galleryView.isOpen ? (
        <GalleryView
          images={images}
          index={galleryView.index}
          onClose={handleCloseGallery}
        />
      ) : (
        <>
          {data.sections.map((section, index) => (
            <Section key={index} section={section} onImageClick={handleImageClick} />
          ))}
          {/* <ItemListActionBar />  */}
        </>
      )}
    </div>
  );
};
const Section = ({ section, onImageClick }) => (
  <div>
    <div className={styles.sectionTitle}>{section.title}</div>
    {section.items.map((item, index) => (
      <Item key={item.id} item={item} index={index} onImageClick={onImageClick} />
    ))}
  </div>
);
  

export default ItemListSections;
