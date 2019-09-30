import React, { useState, useEffect } from 'react';
import HomePage from './pages/home-page/HomePage.js';
import './App.css';

function App() {

  const [pokemon, setPokemon] = useState([]);
  const [linkLoad, setNextLink] = useState('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20');

  useEffect(() => {
    if(linkLoad){
      fetch(linkLoad)
        .then(response => response.json())
        .then(data =>  {
            setPokemon(pokemon.concat(data.results)); 
            setNextLink(data.next);
        }, () => { console.log(pokemon); });
    }
  });

  return (
    <div className="App">
      <header className="App-header">
      
      </header>

      <HomePage pokemon={pokemon}/>

    </div>
  );
}


export default App;
