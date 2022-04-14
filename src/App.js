import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import PokemonItem from './routes/PokemonItem';

// This is the pokedex repository

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState();

  const [search, setSearch] = useState("");
  
  // Math.floor is basically rounding, kind of. Math.random returns 0 or 1, so multiply it by whatever number so range it from 0, [ that number ].
  const randomNum = () => {
    return Math.floor(Math.random() * 1200);
  }

  const fetchPokemon = useCallback( async () => {
    let item;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum()}`)
    const { data } = await response.json();
    return data;
    // .then(res => {
    //   console.log(res);
    //   return res.json();
    // })
    // .then(data => {
    //   console.log(data);
    //   return data;
    // })

  }, [])

  useEffect(() => {
    // randomNum();
    const pokemon1 = fetchPokemon();
    console.log(pokemon1);
    setSelectedPokemon(pokemon1);
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

  let ok;
  document.title = "Pokédex";
  //console.log(selectedPokemon);
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
        { /* This is currently broken. */ }
        {/* {selectedPokemon && <PokemonItem pokemon={selectedPokemon}/>} */}
        {/* <PokemonItem pokemon={fetchPokemon()}/> */}
        
      </div>
    </div>
  );
}

export default App;
