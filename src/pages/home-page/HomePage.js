import React from 'react';

export default class PokemonProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchParamenter: ""
        };
    }
    
    handleChange(e) {
        this.setState({searchParamenter: e.value});
    }

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