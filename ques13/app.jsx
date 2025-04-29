import React, { useState, useEffect } from 'react';
import './App.css';

function Counter() {
  const [counter, setCounter] = useState(0); 

  useEffect(() => {
    console.log(`Counter value is: ${counter}`);
  }, [counter]); 

 
  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  const reset = () => {
    setCounter(0);
  };

  return (
    <div className="counter-container">
      <h1>Counter: {counter}</h1>
      <div className="buttons">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
