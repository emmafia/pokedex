import React, { Component } from 'react';
import sortBy from 'sort-by';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemons: [
                {
                    "id": 1,
                    "name": "bulbasaur",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                    "type": 'grass',
                },
                {
                    "id": 2,
                    "name": "ivysaur",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
                    "type": 'grass',
                },
                {
                    "id": 3,
                    "name": "venusaur",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
                    "type": 'grass',
                },
                {
                    "id": 4,
                    "name": "charmander",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
                    "type": 'fire',
                },
                {
                    "id": 5,
                    "name": "charmeleon",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
                    "type": 'fire',
                },
                {
                    "id": 6,
                    "name": "charizard",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
                    "type": 'fire',
                },
                {
                    "id": 7,
                    "name": "squirtle",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
                    "type": 'water',
                },
                {
                    "id": 8,
                    "name": "wartortle",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
                    "type": 'water',
                },
                {
                    "id": 9,
                    "name": "blastoise",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
                    "type": 'water',
                },
                {
                    "id": 10,
                    "name": "caterpie",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
                    "type": 'bug',
                },
                {
                    "id": 11,
                    "name": "metapod",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
                    "type": 'bug',
                },
                {
                    "id": 12,
                    "name": "butterfree",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
                    "type": 'bug',
                },
                {
                    "id": 13,
                    "name": "weedle",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png",
                    "type": 'bug',
                },
                {
                    "id": 14,
                    "name": "kakuna",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
                    "type": 'bug',
                },
                {
                    "id": 15,
                    "name": "beedrill",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png",
                    "type": 'bug',
                },
                {
                    "id": 16,
                    "name": "pidgey",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
                },
                {
                    "id": 17,
                    "name": "pidgeotto",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png",
                    "type": 'flying',
                },
                {
                    "id": 18,
                    "name": "pidgeot",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",
                    "type": 'flying',
                },
                {
                    "id": 19,
                    "name": "rattata",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
                    "type": 'normal',
                },
                {
                    "id": 20,
                    "name": "raticate",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png",
                    "type": 'normal',
                }
            ],
            sortedBy: '',
            filteredBy: ''
        };
    }

    handleClickSort(arg) {
        this.setState({
            sortedBy: arg,
        });
    }

    handleClickFilter(arg) {
        this.setState({
            filteredBy: arg,
        });
        console.log(arg);
    }

    render() {
        const sortedAndFilteredPokemons = this.state.pokemons
            .filter(poke => this.state.filteredBy === '' ? poke : poke.type === this.state.filteredBy)
            .sort(sortBy(this.state.sortedBy))

        const selectedPokemon = this.state.pokemons[this.state.selectedPokemon];

        const stats = {
            total: this.state.pokemons.length,
            shown: sortedAndFilteredPokemons.length,
        };


        return (
            <div>
                <h1>Pokemons!</h1>
                <h2>Sort them:</h2>
                <Button onClick={this.handleClickSort.bind(this, 'name')} text='Sort by name' />
                <Button onClick={this.handleClickSort.bind(this, 'id')} text='Sort by id' />
                <h2>Filter them:</h2>
                <Button onClick={this.handleClickFilter.bind(this, '')} text='All' />
                <Button onClick={this.handleClickFilter.bind(this, 'bug')} text='Bug' />
                <Button onClick={this.handleClickFilter.bind(this, 'fire')} text='Fire' />
                <Button onClick={this.handleClickFilter.bind(this, 'flying')} text='Flying' />
                <Button onClick={this.handleClickFilter.bind(this, 'grass')} text='Grass' />
                <Button onClick={this.handleClickFilter.bind(this, 'normal')} text='Normal' />
                <Pokemons pokemons={sortedAndFilteredPokemons} />
                <PokemonDetails pokemon={selectedPokemon} />
                <Stats stats={stats} />
                <div className='pokeContainer'>
                    {pokemons}
                </div>
            </div>
        );
    }
};

class Button extends React.Component {
    render() {

        return (
            <button onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
};


export default App;
