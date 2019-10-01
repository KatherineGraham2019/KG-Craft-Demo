import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage.js';
import PokemonProfile from './pages/pokemon-profile/PokemonProfile.js';
import './app.scss';

function App() {

  const [pokemon, setPokemon] = useState([]);
  const [id, setId] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data =>  {
        setPokemon(oldArray => [...oldArray, {...data}]); 
        if(id !== 151){ 
          setId(id + 1); 
        } else {
          setIsLoading(false);
        }
      });
  }, [id]);

  return (
    <div className="App">
      <div className="image-center">
        <img className="pokemon-logo" src='/International_Pokémon_logo.png' />
      </div>

      <Router>
        <Route exact path="/">
          <HomePage pokemon={pokemon} isLoading={isLoading}/>
        </Route>
        <Route exact path="/pokemon/:id" component={PokemonProfile} />
      </Router>

    </div>
  );
}


export default App;
