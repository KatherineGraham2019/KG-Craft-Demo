import React, { useState, useEffect } from 'react';
import HomePage from './pages/home-page/HomePage.js';
import './App.css';

function App() {

  const [pokemon, setPokemon] = useState([]);
  const [id, setId] = useState(1);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data =>  {
        setPokemon(oldArray => [...oldArray, {...data}]); 
        if(id !== 151){ setId(id + 1); }
      }, () => { console.log(pokemon); });
  }, [id]);

  return (
    <div className="App">
      <header className="App-header">
      
      </header>

      <HomePage pokemon={pokemon}/>

    </div>
  );
}


export default App;
