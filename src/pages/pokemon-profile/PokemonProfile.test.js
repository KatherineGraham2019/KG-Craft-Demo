import React from 'react';
import ReactDOM from 'react-dom';
import PokemonProfile from './PokemonProfile.js';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PokemonProfile match={{ params: { id: 1 } }}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

