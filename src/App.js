import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/about';
import Terms from './pages/terms';
import Home from './pages/home';
import Week from './pages/week';
import Month from './pages/month';

function App() {

  return (
    
    <div className="App">

      <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/week' element={<Week />} />
        <Route path='/month' element={<Month />}/> 
        <Route path='/about' element={<About />} />
        <Route path='/terms' element={<Terms />}/> 
      </Routes>
    </Router>

      
    </div>
  );

}

export default App;
