// ./components/AIForm.js
import { useState } from 'react';
import styles from './AIForm.module.css';
import FullScreenLoading from './FullScreenLoading';
// import Loading from './Loading';
import ResponseDisplay from './ResponseDisplay';
import axios from 'axios';

function AIForm() {
  const [title, setTitle] = useState('');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/.netlify/functions/openai', { text: input });
      setResponse(res.data);
    } catch (error) {
      setResponse({ error: error.toString() });
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <FullScreenLoading />
      ) : response ? (
        <ResponseDisplay response={response} onTryAgain={() => setResponse(null)} />
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Give your list a name:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.inputTitle}/>
          </label>
          <label className={styles.label}>
            Enter some content:
            <textarea value={input} onChange={(e) => setInput(e.target.value)} className={styles.inputContent}/>
          </label>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      )}
    </div>
  );
}

export default AIForm;
