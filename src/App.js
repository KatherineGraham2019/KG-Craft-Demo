import React, { useState, useEffect } from 'react';
import HomePage from './pages/home-page/HomePage.js';
import './App.css';

function App() {

  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
      .then(response => response.json())
      .then(data =>  {
        setPokemon(data.results); 
      }, () => { console.log(pokemon); });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      
      </header>

      <HomePage pokemon={pokemon}/>

    </div>
  );
}


export default App;
