import React, { useEffect, useState } from 'react';

export default function PlayGround() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetch('/.netlify/functions/get-items', {
      method: 'POST',
      body: JSON.stringify({ listId: '365810913567047760' }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setItems(data.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [clickCount]);

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <button onClick={handleClick}>Fetch Items</button>
      <h1>Items</h1>
      {items.map(item => (
        <div key={item.ref['@ref'].id}>
          <h2>{item.data.name}</h2>
          <p>{item.data.description}</p>
          <img src={item.data.photoUrl} alt={item.data.name}/>
          {item.data.ctas.map((cta, index) => (
            <a key={index} href={cta.link}>{cta.title}</a>
          ))}
        </div>
      ))}
    </div>
  );
}
