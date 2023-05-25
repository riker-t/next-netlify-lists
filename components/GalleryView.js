import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { CSSTransition } from 'react-transition-group';
import styles from './GalleryView.module.css';
import itemstyles from './Item.module.css';

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
      <div {...handlers} className={styles.galleryView} onClick={onClose}>
        <CSSTransition
          in={animating}
          timeout={300}
          classNames={`slide-${direction}`}
          onEntered={() => setAnimating(false)}
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

        {/* Rest of your JSX code */}
      </div>
    </>
  );
}

export default GalleryView;
