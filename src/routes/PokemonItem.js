import React, { useState, useEffect } from 'react';
import '../App.css';

const PokemonItem = ({ pokemon }) => {
  console.log(pokemon)
  const sprite = pokemon.sprites.front_default;
  return (
    <div className='pokemon-item' onClick={() => {

    }}>
      <img src={sprite}/>
    </div>
  )
}

export default PokemonItem;