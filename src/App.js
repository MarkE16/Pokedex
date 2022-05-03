import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import PokemonItem from './routes/PokemonItem';
import Modal from './routes/Modal';

// This is the pokedex repository

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [listOfPokemon, setListofPokemon] = useState([]);

  const [amount, setAmount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShown, setModalShown] = useState(false);


  // Math.floor is basically rounding, kind of. Math.random returns 0 or 1, so multiply it by whatever number so range it from 0, [ that number ].
  const randomNum = () => {
    return Math.floor(Math.random() * 1200);
  }

  const timer = ms => new Promise(res => setTimeout(res, ms));
  const fetchPokemon = async (limit=100) => {
    let totalPokemon = [];

    if (!isLoading) {
      setIsLoading(true);
      for (var i = 0; i <= limit; i++) {
        const id = randomNum();
        await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
          totalPokemon.push(data);
        })
        .catch(e => {
          console.error(e);
          console.log("ERROR => " + e.message);
        })
        await timer(500);
      }
      setListofPokemon(totalPokemon);
      setIsLoading(false);

      // return await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}offset=0`)
      // .then(response => response.json())
      // .then(data => {
      //   data.results.forEach(item => {
      //     totalPokemon.push(item);
      //   })
      //   setListofPokemon(totalPokemon);
      //   setIsLoading(false);
      // })
      // .catch(e => {
      //   console.error(e);
      //   console.log("ERROR => " + e.message);
      // })
    }
  }
  const [selectedPokemon, setSelectedPokemon] = useState();

  useEffect(() => {
    fetchPokemon(amount);
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

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Pokédex</h1>
      </header>
      <h2>Enter how many pokémon you want to render.</h2>
      <input style={{ borderRadius: 5, width: 70, textAlign: "center" }} type="number" min="1" max="100" value={amount} onChange={txt => setAmount(txt.target.value)} placeholder="Amount"/>
      <Button variant='primary' className='App-button' disabled={isLoading} onClick={() => fetchPokemon(amount)}>{!isLoading ? "Render" : "Rendering..."}</Button>
      <div className='App-items'>
        {
          listOfPokemon.map(poke => {
            return <PokemonItem pokemon={poke}/>
          })
        }
      </div>
    </div>
  );
}

export default App;
