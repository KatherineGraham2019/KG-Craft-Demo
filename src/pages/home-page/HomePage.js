import React from 'react';

export default class PokemonProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            linkLoad: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
            pokemon: [],
        };
    }

    /*componentDidMount() {
        this.loadPokemon();
    }


    loadPokemon() {
        const { linkLoad } = this.state;

        fetch(linkLoad)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                this.setState(prevState => ({
                    linkLoad: data.next,
                    pokemon: prevState.pokemon.concat(data.results)
                }), () => { if(linkLoad) { this.loadPokemon(); } }
                );
            });
    }*/

    render() {
        const { pokemon } = this.props;

        return (
            <div>
                {pokemon.map((mon, index) => {
                    return (
                        <div key={`pokemon-${mon.name}-${index}`}>{mon.name}</div>
                    )
                })}
            </div>
        );
    }
}