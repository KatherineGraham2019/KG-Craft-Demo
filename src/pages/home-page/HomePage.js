import React from 'react';
import { Link } from 'react-router-dom'
import './home-page.scss';

export default class PokemonProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchParamenter: "",
            showAll: true,
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

    renderAll(pokemon) {
        return(
            <div className="pokemon-item-display">
                {pokemon.map((mon, index) => {
                    return (
                        <div key={`pokemon-${index}`}>
                            {this.renderPokemonBox(mon)}
                        </div>
                    )
                })}
            </div>
        );
    }

    renderFav(pokemon) {
        const savedPokemon = [];

        for (let key in localStorage){
            savedPokemon.push(key);
        }

        const allSavedPokemon = pokemon.filter(pokemon => { 
            if(savedPokemon.includes(pokemon.name)){
                return pokemon;
            }
        });

        return(
            <React.Fragment>
                {this.renderAll(allSavedPokemon)}
            </React.Fragment>
        )
    }

    render() {
        const { searchParameter } = this.state;
        const { pokemon } = this.props;

        const localSaved = Object.entries(localStorage);

        console.log(localSaved); 

        return (
            <div className="home-page">
                <div className="tabs">
                    <div 
                        className={`tab ${this.state.showAll && 'selected'}`}
                        onClick={ () => {this.setState({showAll: true});} }
                    >
                        All
                    </div>
                    <div 
                        className={`tab ${!this.state.showAll && 'selected'}`}
                        onClick={ () => {this.setState({showAll: false});} }
                    >
                        Favorites 
                    </div>
                </div>
                <div className="text-input">
                    <input 
                        className="search-input"
                        placeholder={"Find A Pokemon"}
                        type="text" 
                        value={searchParameter} 
                        onChange={event => this.handleChange(event)}
                    />
                </div>

                {this.state.showAll ? this.renderAll(pokemon) : this.renderFav(pokemon)}

                <div className={this.props.isLoading ? "isLoadig" : "hide"}>Loading...</div> 
            </div>
        );
    }
}