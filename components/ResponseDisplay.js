// ./components/ResponseDisplay.js
import { useState } from 'react';
import styles from './ResponseDisplay.module.css';

function ResponseDisplay({ response, onTryAgain }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleSaveAndCopy = () => {
    navigator.clipboard.writeText('https://yourwebsite.com');
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1000);
  };

  return (
    <div className={styles.container}>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <button className={styles.button} onClick={onTryAgain}>Try Again</button>
      <button className={styles.button} onClick={handleSaveAndCopy}>Save List and Copy Link</button>
      {showPopup && <div className={styles.popup}>Link Copied!</div>}
    </div>
  );
}

export default ResponseDisplay;
