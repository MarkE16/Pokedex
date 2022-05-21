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
            <h2 style={{ color: "black" }}>Pokédex Info</h2>
            <div className='modalContent'>
              <div className='modalItems'>
                <table>
                    <tr>
                      <th>Abilities</th>
                      <th>Moves</th>
                      <th>Weight</th>
                      <th>Height</th>
                      <th>Type(s)</th>
                      <th>Base Experience</th>
                    </tr>
                    <tr className='info-row'>
                      <td>
                        <div>
                          <ul>
                            {
                              pokemon.abilities.map(ab => {
                                return <li>{ab.ability.name.charAt(0).toUpperCase() + ab.ability.name.slice(1)}</li>
                              })
                            }
                          </ul>
                        </div>
                      </td>
                      <td>
                        <div>
                          <ul>
                          {
                            pokemon.moves.map(move => {
                              return <li>{move.move.name}</li>
                            })
                          }
                          </ul>
                        </div>
                      </td>
                      <td>
                        {(pokemon.weight / 10).toString() + " kg"}
                      </td>
                      <td>
                        {pokemon.height}
                      </td>
                      <td>
                        <ul>
                        {
                          pokemon.types.map(type => {
                            return <li>{type.type.name}</li>
                          })
                        }
                        </ul>
                      </td>
                      <td>
                        {pokemon.base_experience}
                      </td>
                    </tr>
                    <tr></tr>
                </table>
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