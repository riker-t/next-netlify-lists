// ./components/AIForm.js
import { useState } from 'react';
import axios from 'axios';

function AIForm() {
  const [title, setTitle] = useState('');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Input:
          <textarea value={input} onChange={(e) => setInput(e.target.value)} style={{ width: '100%', height: '100px' }} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        response && <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
}

export default AIForm;
