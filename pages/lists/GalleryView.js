import React from 'react';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { FaArrowAltCircleLeft, FaList } from 'react-icons/fa';
import styles from './GalleryView.module.css';
import itemstyles from './Item.module.css';

function GalleryView({ images, index, onClose }) {
  const [currentImage, setCurrentImage] = React.useState(index);

  const handleChangeIndex = index => {
    setCurrentImage(index);
  };

  const indicator = `${currentImage + 1}/${images.length}`;

  return (
    <div className={styles.galleryView}>
      <div className={styles.closeButton} onClick={onClose}>
        <FaList />
      </div>

      <SwipeableViews index={currentImage} onChangeIndex={handleChangeIndex} resistance>
        {images.map((image, i) => (
          <div key={i} className={styles.galleryImageWrapper}>
            {(image.photoUrl || image.linkUrl) ? (
              <img
                src={image.photoUrl || `https://image.thum.io/get/auth/${process.env.THUMBIO_KEY}/${image.linkUrl}`}
                alt={image.name}
                className={styles.galleryImage}
              />

            ) : (
              <img
                src='https://images.unsplash.com/photo-1559311648-addd6af95dd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
                alt="Fallback Image"
                className={styles.galleryImage}
              />
            )}
          </div>
        ))}
      </SwipeableViews>
      <div className={styles.indicator}>{indicator}</div>

      <div className={styles.galleryContent}>
        <div className={itemstyles.itemName}>{images[currentImage].name}</div>
        {images[currentImage].description && (
          <div className={itemstyles.itemDescription}>
            {images[currentImage].description}
          </div>
        )}
        <div >
          {images[currentImage].linkUrl &&
            <div className={styles.itemCtasContainer}>

              <a href={images[currentImage].linkUrl} target="_blank" rel="noopener noreferrer" className={itemstyles.itemCta}>
                Link
              </a>
            </div>}
        </div>
      </div>
    </div>
  );
}

export default GalleryView;
