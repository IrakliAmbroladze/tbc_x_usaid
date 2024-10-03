import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/" exact>Home</NavLink> | 
        <NavLink to="/assignement-3">Assignment 3</NavLink> | 
        <NavLink to="/profile">Profile</NavLink> | 
        <NavLink to="/blog">BLOG</NavLink> | 
        <NavLink to="/contact">Contact</NavLink> | 
        <NavLink to="/about">About</NavLink>
      </nav>

    </header>
  )
}

