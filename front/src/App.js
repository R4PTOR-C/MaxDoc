import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Usuarios_index from './components/Usuarios_index'
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={
            <>
            <Usuarios_index/>
            </>
          }/>
        </Routes>
      </Router>
  );
}

export default App;
