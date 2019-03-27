import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className='header-container'>
        <h1>Pokemons</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pokemons">Pokemons</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    );
  }
}

export default Header;