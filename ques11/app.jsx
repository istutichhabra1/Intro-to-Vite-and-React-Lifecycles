import React from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      {}
      <header className="header">
        <h1>My Vite Webpage</h1>
      </header>

      {}
      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {}
      <main className="main-content">
        <h2>Welcome to My Website!</h2>
        <p>This is a simple webpage created with Vite.</p>
      </main>

      {}
      <footer className="footer">
        <p>&copy; 2025 My Vite Webpage</p>
      </footer>
    </div>
  );
}

export default App;
