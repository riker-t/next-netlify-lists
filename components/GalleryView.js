import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './GalleryView.module.css';
import itemstyles from './Item.module.css';
import ItemListActionBar from './ItemListActionBar';

function GalleryView({ images, index, onClose }) {
  const [currentImage, setCurrentImage] = useState(index);

//   const handlers = useSwipeable({
//     onSwipedLeft: () =>
//       setCurrentImage((oldIndex) => (oldIndex + 1) % images.length),
//     onSwipedRight: () =>
//       setCurrentImage((oldIndex) => (oldIndex - 1 + images.length) % images.length),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      let nextImageIndex = currentImage;
      do {
        nextImageIndex = (nextImageIndex + 1) % images.length;
        console.log(nextImageIndex)
      } while (images[nextImageIndex].photoUrl === null);
      setCurrentImage(nextImageIndex);
    },
    onSwipedRight: () => {
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

  return (
    <>
      <div {...handlers} className={styles.galleryView} onClick={onClose}>
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
      <ItemListActionBar />
    </>
  );
}

export default GalleryView;
