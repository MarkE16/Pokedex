import React, { useState, useEffect } from 'react';
import '../App.css';

const fetchSprite = (poke) => fetch(poke.url)
  .then(res => res.json())
  .then(data => {
    return data.sprites.front_default;
  });

const PokemonItem = ({ pokemon }) => {
  const [sprite, setSprite] = useState("");

  useEffect(() => {
    fetchSprite(pokemon).then((res) => setSprite(res));
  }, [pokemon]);

  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  return (
    <div className='pokemon-item' onClick={() => {
      // Here, this will display the pokemon's info.
    }}>
      <h3>{name}</h3>
      <img className='pokemon-img' src={sprite}/>
    </div>
  )
}

export default PokemonItem;