import React, { useState, useEffect } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import '../App.css';

const Modal = ({ pokemon, setIsOpen }) => {
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const { sprites } = pokemon;
  
  return (
    <div className='darkBG' onClick={() => setIsOpen(false)}>
        <div className='modal' onClick={e => e.stopPropagation()}>
          <div className='modalHeader'>
            <h5 className='heading'>{name}</h5>
          </div>
            <Button className='closeBtn' onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px"}} />
            </Button>
            <div className='modalImg'>
              <img src={sprites.front_default} />
            </div>
            <div className='modalContent'>
              <h2>Pokédex Info</h2>
              <div className='modalItems'>
                <h3>Moves</h3>
                <ul style={{ listStyleType: "none" }}>
                {
                  pokemon.abilities.map(ab => {
                    return <li style={{ paddingUp: 10 }}>{ab.ability.name.charAt(0).toUpperCase() + ab.ability.name.slice(1)}</li>
                  })
                }
                </ul>
                <h3>Hello</h3>
              </div>
            </div>
            <div className='modalActions'>
              <div className='actionsContainer'>
                <Button className='okBtn' onClick={() => setIsOpen(false)}>
                  OK
                </Button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Modal;