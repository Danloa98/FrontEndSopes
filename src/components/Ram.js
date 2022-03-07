import React from 'react'
import {
  Rectangulo,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavBarElements';
//import { Line, defaults } from 'react-chartjs-2'

const Ram = () => {
  return (
    <div>
      <div>RAM</div>
      <Rectangulo>
        <div className='rectangle2'>
          Total RAM
        </div>
        <div className='rectangle2'>
          RAM en uso
        </div>
        <div className='rectangle2'>
          RAM en uso %
        </div>
        <div className='rectangle2'>
          RAM libre
        </div>
        
      </Rectangulo>
    </div>
  )
}

export default Ram