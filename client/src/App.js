import React from 'react';
import logo from './logo.svg';
import './App.css';
import Studies from './components/studies/studies'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      <Studies />
      </header>
    </div>
  );
}

export default App;
