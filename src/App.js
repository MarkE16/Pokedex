import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import PokemonItem from './routes/PokemonItem';

// This is the pokedex repository

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState({});

  const [search, setSearch] = useState("");
  
  // Math.floor is basically rounding, kind of. Math.random returns 0 or 1, so multiply it by whatever number so range it from 0, [ that number ].
  const randomNum = () => {
    return Math.floor(Math.random() * 1200);
  }

  // This function is always returning 'undefined' for some reason.
  const fetchPokemon = async () => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum()}`)
    .then(response => response.json())
    .then(data => {
      return data;
    })
  }

  useEffect(() => {
    // randomNum();
    const pokemon1 = fetchPokemon()
    .then(result => {
      setSelectedPokemon(result);
    })
    }, [])

  const handleClick = () => {
    randomNum();
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50offset=0")
    .then(res => {
      return res.json();
    })
    .then(data => {
      data.results.forEach(pokemon => {
        console.log(pokemon.name)
      })
     //setPokemonName(data.name);
    })
    .catch(e => {
      console.error(e);
      console.log("ERROR => " + e.message);
    })
    
  }

  

  const handleSearch = query => {
    let pokemons = [];
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(e => {
      console.error(e);
      console.log("ERROR => " + e.message);
    })
  }

  document.title = "Pokédex";
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Pokédex</h1>
        <input style={{ borderRadius: 5 }} type="text" value={search} onChange={txt => setSearch(txt.target.value)} placeholder="Search..."/>
        <Button variant='primary' className='App-button' onClick={() => handleSearch(search)}>Search</Button>

        
      </header>
      <Button variant="primary" className='App-button' onClick={() => handleClick()}>Click me</Button>
      <p>Selected Pokemon Name: {pokemonName}</p>
      <div className='App-items'>
        <PokemonItem pokemon={selectedPokemon}/>
        
      </div>
    </div>
  );
}

export default App;
