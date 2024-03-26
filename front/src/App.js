import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import './styles/login.css';
import Usuarios_index from './components/Usuarios_index';
import Login from './components/login';
import Usuarios_new from "./components/Usuarios_new";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/usuarios" element={<Usuarios_index />} />
                <Route path="/" element={<Login />} />
                <Route path="/usuarios/new" element={<Usuarios_new />} />

            </Routes>
        </Router>
    );
}

export default App;
