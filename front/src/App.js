import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './styles/App.css';
import './styles/login.css'
import Usuarios_index from './components/Usuarios_index'
import Login from "./components/login";
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={
            <>
            <Login/>
            </>
          }/>
        </Routes>
      </Router>
  );
}

export default App;
