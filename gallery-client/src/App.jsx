import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Gallery from "./pages/Gallery"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path ="/" element ={<Login />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gallery" element={<Gallery />} />
        
      </Routes>
    </Router>
  )
}

export default App
