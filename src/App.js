import React from 'react';
import './App.css';
import Routes from './routes.js';
if (process.env.NODE_ENV !== 'production') require('dotenv').config();


function App() {
  return (
    <Routes />
  );
}

export default App;
