import React, { useState, useEffect } from 'react';
import '../App.css';

const PokemonItem = ({ pokemon }) => {
  //const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  // const sprite = pokemon.sprites.front_default;
  return (
    <div className='pokemon-item' onClick={() => {

    }}>
      {/* <img src={sprite}/> */}
      <div>
        <h3>Pokemon</h3>
      </div>
    </div>
  )
}

export default PokemonItem;