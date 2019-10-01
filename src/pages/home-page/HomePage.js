import React from 'react';
import { Link } from 'react-router-dom'
import './home-page.scss';

export default class PokemonProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchParamenter: ""
        };
    }
    
    handleChange(e) {
        console.log(e.value);
        this.setState({searchParamenter: e.value});
    }

    renderPokemonBox(pokemon) {
        return(
            <div className="display-pokemon">
                <div className="image-container"><img src={pokemon.sprites.front_default} /></div>
                <Link to={`/pokemon/${pokemon.id}`}><div className="name-text">{pokemon.name}</div></Link>
            </div>
        );
    }

    render() {
        const { searchParameter } = this.state;
        const { pokemon } = this.props;

        return (
            <div className="home-page">
                <button>All</button>
                <button>Fav</button>
                <input 
                    placeholder={"Find A Pokemon"}
                    type="text" 
                    value={searchParameter} 
                    onChange={event => this.handleChange(event)}
                />
                <div className="pokemon-item-display">
                    {pokemon.map((mon, index) => {
                        return (
                            <div key={`pokemon-${index}`}>
                                {this.renderPokemonBox(mon)}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}