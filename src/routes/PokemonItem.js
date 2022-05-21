import React, { useState, useEffect } from 'react';
import Modal from '../routes/Modal';
import '../App.css';


const PokemonItem = ({ pokemon, setModalShown, modalShown, setSelectedPokemonName, selectedPokemonName }) => {
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const { sprites } = pokemon;

  return (
    <div>
      <div className='pokemon-item' onClick={() => {
        setModalShown(true);
        setSelectedPokemonName(name);
        }}>
        <h2>{name}</h2>
        <img className='pokemon-img' src={sprites.front_default}/>
      </div>
      {modalShown && selectedPokemonName === name && <Modal pokemon={pokemon} setIsOpen={setModalShown}/>}
    </div>
  )
}

export default PokemonItem;