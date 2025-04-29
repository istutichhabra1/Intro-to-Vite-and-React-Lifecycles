import React, { useState, useEffect } from 'react';
import './App.css';

function JokeFetcher() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoke = async () => {
      setLoading(true); 
      try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await response.json();
        setJoke(data); 
      } catch (error) {
        console.error('Error fetching the joke:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchJoke(); 
  }, []); 
  const fetchNewJoke = () => {
    setJoke(null); 
    setLoading(true);
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then((response) => response.json())
      .then((data) => {
        setJoke(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the joke:', error);
        setLoading(false);
      });
  };

  return (
    <div className="joke-container">
      <div className="card">
        <h2>Random Joke</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p><strong>{joke.setup}</strong></p>
            <p>{joke.punchline}</p>
          </div>
        )}
        <button onClick={fetchNewJoke}>Get Another Joke</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <JokeFetcher />
    </div>
  );
}

export default App;
