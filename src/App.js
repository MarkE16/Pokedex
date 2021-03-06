import './App.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import PokemonItem from './routes/PokemonItem';
import classNames from 'classnames';

// This is the pokedex repository

const App = () => {
  const [selectedPokemonName, setSelectedPokemonName] = useState("");
  const [listOfPokemon, setListofPokemon] = useState([]);

  const [amount, setAmount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  

  // Math.floor is basically rounding, kind of. Math.random returns 0 or 1, so multiply it by whatever number so range it from 0, [ that number ].
  const randomNum = () => {
    const num = Math.floor(Math.random() * 898)
    return (num === 0 ? 1 : num);
  }

  // const timer = ms => new Promise(res => setTimeout(res, ms));
  const fetchPokemon = async (limit=100) => {
    let totalPokemon = [];

    if (!isLoading) {
      setIsLoading(true);
      for (var i = 0; i < limit; i++) {
        const id = randomNum();
        await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
          if (totalPokemon.length === 0) {
            totalPokemon.push(data);
          } else {
            if (!totalPokemon.includes(data)) {
              totalPokemon.push(data);
            }
          }
        })
        .catch(e => {
          console.error(e);
          console.log("ERROR => " + e.message);
        })
      }
      setListofPokemon(totalPokemon);
      setIsLoading(false);
    }
  }
  const [selectedPokemon, setSelectedPokemon] = useState();

  useEffect(() => {
    fetchPokemon(amount);
    
  }, [])


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
  const appItemsClassName = classNames({
    "App-items": true,
    "modal-open": modalShown
  })

  const resetItems = () => {
    setAmount(1);
    const newArray = [listOfPokemon[0]];
    setListofPokemon(newArray);
  }

  return (
    <div id="top" className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Pok??dex</h1>
      </header>
      <h2>Enter how many pok??mon you want to render.</h2>
      <h3><span style={{ color: "lightgreen" }}>1</span> is the minimum and <span style={{ color: "#e80000" }}>898</span> is the maximum amount you can render.</h3>
      <h5><span style={{ color: "#e80000" }}>[!] Warning</span>: By rendering a high amount of pokemon, performance problems could appear. Please be careful.</h5>
      <input style={{ borderRadius: 5, width: 70, textAlign: "center" }} type="number" min="1" max="898" value={amount} onChange={txt => setAmount(txt.target.value)} placeholder="Amount"/>
      <Button variant='primary' className='App-button' disabled={isLoading} onClick={() => fetchPokemon(amount)}>{!isLoading ? "Render" : "Rendering..."}</Button>
      <Button className='App-button' onClick={() => {
        resetItems();
      }}>Reset</Button>
      <div className={appItemsClassName}>
        {
          listOfPokemon.map(poke => {
            return <PokemonItem pokemon={poke} setModalShown={setModalShown} modalShown={modalShown} setSelectedPokemonName={setSelectedPokemonName} selectedPokemonName={selectedPokemonName}/>
          })
        }
      </div>
      {listOfPokemon.length > 10 && <a href='#top'><Button className='App-button'>Back to Top</Button></a>}
    </div>
  );
}

export default App;
