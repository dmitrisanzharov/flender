import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';


// Pages
import Home from './ui-ext/pages/Home/Home';
import Register from './ui-ext/pages/Register/Register';
import NavBar from './ui-ext/components/NavBar/NavBar';


function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
