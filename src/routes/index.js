import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from '../nav/app_nav'
import About from '../pages/about'
import Blog from '../pages/blog'
import Contact from '../pages/contact'
import Home from '../pages/home'
import ProtectedRoute from './protectedRoutes'

export default function AppRoutes () {
  const [isLoggedIn, setLogin] = useState(false)
  return (
    <BrowserRouter>
      <NavBar />
      {isLoggedIn ? (
        <button
          type='button'
          onClick={() => setLogin(!isLoggedIn)}
          style={{ backgroundColor: 'blue', border: 'none', color: 'white' }}>
          Log Out
        </button>
      ) : (
        <button type='button' onClick={() => setLogin(!isLoggedIn)}>
          Log In
        </button>
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/blog'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Blog />
            </ProtectedRoute>
          }
        />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
