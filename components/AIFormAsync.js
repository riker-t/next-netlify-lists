import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AIForm.module.css';
import FullScreenLoading from './FullScreenLoading';
import ResponseDisplay from './ResponseDisplay';

function AIFormAsync() {
  const [title, setTitle] = useState('');
  const [input, setInput] = useState('');
  const [profileId, setProfileId] = useState('365810913567047760')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [findWebsites, setFindWebsites] = useState(false);
  const [createPhotos, setCreatePhotos] = useState(false);
  const [writeToDb, setWriteToDb] = useState(false);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || input.length < 10) {
      setError('Title is required and input must exceed 10 characters');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('/.netlify/functions/openai2-background', {
        profileId,
        title,
        text: input,
        phoneNumber,
        settings: {
          findWebsites,
          createPhotos,
          writeToDb
        },
      });
      setResponse(res.data);
      setSubmitted(true);
    } catch (error) {
      setResponse({ error: error.toString() });
    }

    setLoading(false);
  };

  const handleTryAgain = () => {
    setTitle('');
    setInput('');
    setPhoneNumber('');
    setResponse(null);
    setSubmitted(false);
    setError(null);
  }

  useEffect(() => {
    if (window.adsbygoogle && submitted) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, [submitted]);

  return (
    <div className={styles.container}>
      {loading && <FullScreenLoading />}
      {!loading && !response && (
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.inputTitle} />
          </label>
          <label className={styles.label}>
            Input:
            <textarea value={input} onChange={(e) => setInput(e.target.value)} className={styles.inputContent} />
          </label>
          <div className={styles.settings}>
            {/* React Component */}
            <div className={styles.labelCheckbox}>
              <input
                id="findWebsites"
                type="checkbox"
                checked={findWebsites}
                onChange={() => setFindWebsites(!findWebsites)}
                style={{ display: 'none' }} // Hide the original checkbox
              />
              <label htmlFor="findWebsites" className={findWebsites ? styles.customCheckboxChecked : styles.customCheckbox}></label>
              Find Websites:
            </div>

            {/* <label className={styles.label}>
              Create Photos:
              <input type="checkbox" checked={createPhotos} onChange={() => setCreatePhotos(!createPhotos)} />
            </label>
            <label className={styles.label}>
              Write to DB:
              <input type="checkbox" checked={createPhotos} onChange={() => setWriteToDb(!writeToDb)} />
            </label> */}
            <div></div>

            <label className={styles.label}>
              Phone Number:
              <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className={styles.inputTitle} />
            </label>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      )}
      {!loading && response && (
        <div>
          <ResponseDisplay response={response} onTryAgain={handleTryAgain} />
        </div>
      )}
    </div>
  );
}

export default AIFormAsync;
