import React from 'react';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
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
        <FaArrowAltCircleLeft />
      </div>

      <SwipeableViews index={currentImage} onChangeIndex={handleChangeIndex} resistance>
        {images.map((image, i) => (
          <div key={i} className={styles.galleryImageWrapper}>
            <img
              src={image.photoUrl}
              alt={image.name}
              className={styles.galleryImage}
            />
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
          {images[currentImage].ctas &&
            images[currentImage].ctas.map((cta) => (
              <a
                key={cta.title}
                href={cta.link}
                target="_blank"
                rel="noopener noreferrer"
                className={itemstyles.itemCta}
              >
                {cta.title}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

export default GalleryView;
