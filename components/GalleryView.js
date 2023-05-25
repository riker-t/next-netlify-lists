import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { CSSTransition } from 'react-transition-group';
import styles from './GalleryView.module.css';
import itemstyles from './Item.module.css';

import { FaArrowAltCircleLeft } from 'react-icons/fa';


function GalleryView({ images, index, onClose }) {
  const [currentImage, setCurrentImage] = useState(index);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('right');

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setAnimating(true);
      setDirection('left');
      let nextImageIndex = currentImage;
      do {
        nextImageIndex = (nextImageIndex + 1) % images.length;
      } while (images[nextImageIndex].photoUrl === null);
      setCurrentImage(nextImageIndex);
    },
    onSwipedRight: () => {
      setAnimating(true);
      setDirection('right');
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
      <div {...handlers} className={styles.galleryView}>
        <div className={styles.closeButton} onClick={onClose}>
          <FaArrowAltCircleLeft />
        </div>

        <CSSTransition
          key={currentImage} // unique key
          in={!animating} // set to `true` when the image needs to be visible
          timeout={300}
          classNames={`slide-${direction}`}
          onEntered={() => setAnimating(false)}
          unmountOnExit
        >
          <div className={styles.galleryImageWrapper}>
            <img
              src={images[currentImage].photoUrl}
              alt={images[currentImage].name}
              className={styles.galleryImage}
            />
          </div>
        </CSSTransition>

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
    </>
  );
}

export default GalleryView;
