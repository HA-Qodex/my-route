import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
        <NavLink to={"/"} className="nav-link">Home</NavLink>
        <NavLink to={"/blog"} className="nav-link">Blog</NavLink>
        <NavLink to={"/contact"} className="nav-link">Contact</NavLink>
        <NavLink to={"/about"} className="nav-link">About</NavLink>
    </nav>
  )
}
