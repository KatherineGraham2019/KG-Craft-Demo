import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import './pokemon-profile.scss';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    <Marker position={{ lat: props.lat, lng: props.lng }} />
</GoogleMap>
));

const MAP_API_KEY = "AIzaSyBJ8imfHXgPMfgQuA5GOwHa5Yht89d29Uk";
const HEADER_API_KEY = "HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l";

export default class PokemonProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            pokemon: {},
            lat: 32.715760,
            lng: -117.163820
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
                this.setState({pokemon: data});
            });
    }

    getPokemonLocation(id) {
        fetch(`https://api.craft-demo.net/pokemon/${id}`, {
            headers: {
                'x-api-key': HEADER_API_KEY
            }
        }).then(response => response.json())
            .then(data =>  {
                console.log(data);

                if(data.locations[0]){
                    const coordinates = data.locations[0].split(',');

                    this.setState({
                        lat: parseFloat(coordinates[0]),
                        lng: parseFloat(coordinates[1]),
                    })
                }
            });
    }

    renderPokemonProfile(pokemon) {
        const { name, height, weight, abilities } = pokemon;
        const type = pokemon.types && pokemon.types[0].type.name;

        console.log(abilities);

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
            </div>
        )
    }

    render() {
        const { pokemon, lat, lng } = this.state;

        return (
            <div className="pokemon-profile">
                {pokemon !== {} ? this.renderPokemonProfile(pokemon) : <div></div>}
                    
                <div className="our-map" >
                    <MyMapComponent
                        lat={lat}
                        lng={lng}
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