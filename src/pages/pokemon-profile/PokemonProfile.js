import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import './pokemon-profile.scss';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.coordinates.length && props.coordinates.map((coords, index) => {
        const coordinateSplit = coords.split(',');

        console.log(coords);

        return(
            <Marker
                key={`marker-${index}`}
                position={{ 
                    lat: parseFloat(coordinateSplit[0]), 
                    lng: parseFloat(coordinateSplit[1])
                }} 
            />
        )
    })}
</GoogleMap>
));

const MAP_API_KEY = "AIzaSyBXPgZ5poyvrTBPk7TJCkXSpCVMxi2Tc34";
const HEADER_API_KEY = "HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l";

export default class PokemonProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            pokemon: {},
            coordinates: [],
            lat: 32.715760,
            lng: -117.163820,
            name: "",
            checked: false,
        }
    }

    componentDidMount() {
        const { id } = this.state;
        
        this.getPokemon(id);
        this.getPokemonLocation(id);
    }

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

    getPokemonLocation(id) {
        fetch(`https://api.craft-demo.net/pokemon/${id}`, {
            headers: {
                'x-api-key': HEADER_API_KEY
            }
        }).then(response => response.json())
            .then(data =>  {
                this.setState({ coordinates: data })
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
            console.log(key);
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
                <img src={pokemon['sprites'] && pokemon['sprites'].front_shiny} />
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
                <input 
                    checked={checked} 
                    type="checkbox" 
                    onChange={(event) => this.handleCheckboxChange(event)} 
                />
            </div>
        )
    }

    render() {
        const { pokemon, coordinates, lat, lng } = this.state;

        return (
            <div className="pokemon-profile">
                {pokemon !== {} ? this.renderPokemonProfile(pokemon) : <div></div>}

                <div className="our-map" >
                    <MyMapComponent
                        lat={lat}
                        lng={lng}
                        coordinates={coordinates}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.
                            exp&libraries=geometry,drawing,places&key=${MAP_API_KEY}`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `500px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
            </div>
        );
    }
}