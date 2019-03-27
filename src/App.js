import React, { Component } from 'react';
import sortBy from 'sort-by';
import './App.css';
import Button from "./components/Button.js"
import Header from "./components/Header.js"
import Home from "./components/Home.js"
import About from "./components/About.js"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const request = require('axios');
const API_URL = 'https://pokeapi.co/api/v2/';

class App extends Component {
  render() {
    return (
      <Router basename="/pokedex">
        <div>
          {/* Navigation / Header */}
          <Header />

          {/* Main content */}
          <Route path="/" exact component={Home} />
          <Route path="/pokemons" component={Pokemons} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

class Pokemons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      sortedBy: '',
      filteredBy: '',
      searchTerm: ''
    };
  }

  componentDidMount() {
    getPokemonData()
      .then((pokemonData) => {
        this.setState({
          pokemons: pokemonData
        })
      })
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
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.setState({
        searchTerm: this.refs.nameInput.value
      });
    }
  }

  handleClickClear() {
    this.setState({
      searchTerm: ''
    });
    this.refs.nameInput.value = '';
  }

  pokemonDetails(id) {
    // console.log(id);
    // getPokemonDetails(id);
  }

  render() {
    const pokemons = this.state.pokemons
      .filter(poke => this.state.searchTerm === '' ? poke : poke.name.includes(this.state.searchTerm))
      .sort(sortBy(this.state.sortedBy))
      .map((poke, i) => (
        <div key={poke.id} className='pokeDiv' onClick={this.pokemonDetails.bind(this, poke.id)}>
          <img src={poke.image} alt='imagetext' />
          <p className='pokemonname'>#{poke.id}  {firstLetterInNameToUppercase(poke.name)}</p>
        </div>
      ));

    return (
      <div className='appcontainer'>
        <h2>Find your favourite pokemons</h2>
        <div className='searchDiv'>
          <input
            ref="nameInput"
            type="text"
            placeholder="Search for a pokemon!"
            onKeyDown={this.handleKeyDown.bind(this)} />
          <Button onClick={this.handleClickClear.bind(this)} text='Clear search' />
          <Button onClick={this.handleClickSort.bind(this, 'name')} text='Sort by name' />
          <Button onClick={this.handleClickSort.bind(this, 'id')} text='Sort by id' />
        </div>
        <div className='pokeContainer'>
          {pokemons}
        </div>
      </div>
    );
  }
};


export default App;

// Utility functions
function getIdFromUrl(url) {
  return parseInt(url.slice(34, -1));
}

function getImageFromId(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function firstLetterInNameToUppercase(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

function getPokemonData() {
  const promiseOfTransformedData = request.get(API_URL + 'pokemon/?limit=100')
    .then((response) => {
      let pokemonData = response.data.results.map((obj) => {
        obj.id = getIdFromUrl(obj.url)
        obj.image = getImageFromId(obj.id)
        return obj;
      })
      // console.log(pokemonData);
      return pokemonData;

    });
  return promiseOfTransformedData;
}

// function getPokemonDetails(id) {
//   const promiseOfTransformedDetails = request.get(API_URL + 'pokemon/' + id)
//     .then((response) => {
//       console.log(response.data);
//       let pokemonDetails = response.data.map((obj) => {
//         obj.height = this.height
//         console.log('height: '+obj.height);

//         return obj;
//       })
//       console.log(pokemonDetails);

//       return pokemonDetails;
//     })
//   return promiseOfTransformedDetails;
// }