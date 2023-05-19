// ./components/AIFormAsync.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AIForm.module.css';
import FullScreenLoading from './FullScreenLoading';
import ResponseDisplay from './ResponseDisplay';

function AIFormAsync() {
  const [title, setTitle] = useState('');
  const [input, setInput] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/.netlify/functions/openai2-background', { text: input, phoneNumber });
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
          <label className={styles.label}>
            Phone Number:
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className={styles.inputTitle} />
          </label>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      )}
      {!loading && response && (
        <div>
          <ResponseDisplay response={response} onTryAgain={handleTryAgain} />
          <div className="ad">
            <ins className="adsbygoogle"
                 style={{display:'block'}}
                 data-ad-client="ca-pub-6248739591745777"
                 data-ad-slot="1234567890"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIFormAsync;
