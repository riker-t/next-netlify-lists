import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './GalleryView.module.css';
import itemstyles from './Item.module.css';

function GalleryView({ images, index, onClose }) {
  const [currentImage, setCurrentImage] = useState(index);
  const [transitioning, setTransitioning] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setTransitioning(true);
      let nextImageIndex = currentImage;
      do {
        nextImageIndex = (nextImageIndex + 1) % images.length;
      } while (images[nextImageIndex].photoUrl === null);
      setCurrentImage(nextImageIndex);
    },
    onSwipedRight: () => {
      setTransitioning(true);
      let prevImageIndex = currentImage;
      do {
        prevImageIndex = (prevImageIndex - 1 + images.length) % images.length;
      } while (images[prevImageIndex].photoUrl === null);
      setCurrentImage(prevImageIndex);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const indicator = `${currentImage + 1}/${images.length}`;

  useEffect(() => {
    if (transitioning) {
      const timer = setTimeout(() => {
        setTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [transitioning]);

  return (
    <>
      <div {...handlers} className={`${styles.galleryView} ${transitioning ? styles.transitioning : ''}`} onClick={onClose}>
        <div className={styles.galleryImageWrapper}>
          <img
            src={images[currentImage].photoUrl}
            alt={images[currentImage].name}
            className={styles.galleryImage}
          />
        </div>
        <div className={styles.indicator}>{indicator}</div>


        <div className={styles.galleryContent}>
          <div className={itemstyles.itemName}>{images[currentImage].name}</div>
          {images[currentImage].description && (
            <p className={itemstyles.itemDescription}>
              {images[currentImage].description}
            </p>
          )}
          <div className={itemstyles.contentAndCtasContainer}>
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
    </>
  );
}

export default GalleryView;
