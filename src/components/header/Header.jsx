import React from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';

export default function Header() {
  return (
    <div className='app-header'>
      
      
      <img src={logo} alt="Logo" />
      <a href='/'>Home</a>
      <a href='/contact'>Contact</a>
      <a href='/about'>About</a>
    </div>
  )
}

