
import React, { useState } from 'react';
import Item from './Item';
import ListHeader from './ListHeader';
import GalleryView from './GalleryView';
import styles from './List.module.css';

const List = ({ data }) => {
  const [galleryView, setGalleryView] = useState({ isOpen: false, index: null });

  const handleImageClick = index => {
    setGalleryView({ isOpen: true, index });
  };

  const handleCloseGallery = () => {
    setGalleryView({ isOpen: false, index: null });
  };

  return (
    <div>
      <ListHeader />
      <div className={styles.listContentContainer}>
        {galleryView.isOpen ? (
          <GalleryView
            images={data}
            index={galleryView.index}
            onClose={handleCloseGallery}
          />
        ) : (
          <div>
            {data.map((item, index) => (
              <Item key={item.id} item={item} index={index} onImageClick={handleImageClick} />
            ))}
          </div>
        )}
      </div>
    </div>

  );
};

export default List;
