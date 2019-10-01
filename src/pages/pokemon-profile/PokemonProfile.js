import React from 'react';
import GoogleMapReact from 'google-map-react';
import './pokemon-profile.scss';

const Marker = (props) => {
    const { name } = props;
    return (
      <div className="marker"
        style={{ backgroundColor: '#CC0000', cursor: 'pointer'}}
        title={name}
      />
    );
};

/** API Keys -> Should move to .env file */
const MAP_API_KEY = "AIzaSyBXPgZ5poyvrTBPk7TJCkXSpCVMxi2Tc34";
const HEADER_API_KEY = "HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l";

export default class PokemonProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            pokemon: {},
            coordinates: [],
            center: {
                lat: 33.041359,
                lng: -116.879257,
            },
            name: "",
            checked: false,
        }
    }

    componentDidMount() {
        const { id } = this.state;
        
        this.getPokemon(id);
        this.getPokemonLocation(id);
    }

    /**
     * Calls the API to get the id of the pokemon
     * @param {*} id 
     */
    getPokemon(id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(data =>  {
                this.setState({
                    pokemon: data, 
                    name: data.name,
                    checked: this.isSavedToBag(data.name),
                });
            });
    }

    /** 
     * Calls the API to get the locations of where a pokemon may be
     * @param {*} id 
     */
    getPokemonLocation(id) {
        fetch(`https://api.craft-demo.net/pokemon/${id}`, {
            headers: {
                'x-api-key': HEADER_API_KEY
            }
        }).then(response => response.json())
            .then(data =>  {
                this.setState({ coordinates: data.locations })
            });
    }

    handleCheckboxChange(event) {
        this.setState({ 
            checked: event.target.checked 
        }, () => {
            this.checkboxCallback();
        })
    }

    checkboxCallback() {
        if(this.state.checked === true){
            localStorage.setItem(this.state.name, this.state.id);
        } else {
            localStorage.removeItem(this.state.name);
        }
    }

    /**
     * Boolean check to see if item is already in bag
     * @param {*} id 
     */
    isSavedToBag(name) {
        for (let key in localStorage){
            if(key === name){
                console.log(key);
                return true;
            }
        }

        return false;
    }

    /**
     * Renders the Pokemon information card
     * @param {*} pokemon 
     */
    renderPokemonProfile(pokemon) {
        const { checked } = this.state;
        const { name, height, weight, abilities } = pokemon;
        const type = pokemon.types && pokemon.types[0].type.name;

        return(
            <div className="pokemon-profile-details">
                <img className="pokemon" src={pokemon['sprites'] && pokemon['sprites'].front_shiny} />
                <h1>{name}</h1>
                <p>Height: {height}</p>
                <p>Weight: {weight}</p>
                <p>Type: {type}</p>
                <p>Description: {name} is a {type} type Pokemon with several abilities</p>
                <p>Abilities:</p>
                <ul>
                    {abilities && abilities.map((ability, index) => {
                        return (<li key={`${name}-${ability}-${index}`}>{ability.ability.name}</li>);
                    })}
                </ul>
                <div className="checkbox-container">
                    <label className="checkbox-label" htmlFor="addToBag">Add Pokemon to Bag:</label>
                    <input 
                        id="addToBag"
                        checked={checked} 
                        type="checkbox" 
                        onChange={(event) => this.handleCheckboxChange(event)} 
                    />
                </div>
            </div>
        )
    }

    render() {
        const { pokemon, coordinates, center } = this.state;

        return (
            <div>
                <div className="contain-back-button">
                    <button 
                        className="return"
                        onClick={() => this.props.history.goBack()}
                    >
                        Return To Home
                    </button>
                </div>
                
                <div className="pokemon-profile">
                    {pokemon !== {} ? this.renderPokemonProfile(pokemon) : <div></div>}

                    <div className="our-map" >  
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: MAP_API_KEY }}
                            defaultCenter={center}
                            defaultZoom={9}
                        >
                            {coordinates.length && coordinates.map((coords, index) => {
                                const coordinateSplit = coords.split(',');
                                return(
                                    <Marker
                                        lat={parseFloat(coordinateSplit[0])}
                                        lng={parseFloat(coordinateSplit[1])}
                                        name={pokemon.name}
                                    />
                                )
                            })}
                            
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        );
    }
}