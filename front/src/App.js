import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './styles/App.css';
import './styles/login.css';
import './styles/navbar.css'
import Usuarios_index from './components/Usuarios_index';
import Login from './components/login';
import Usuarios_new from "./components/Usuarios_new";
import Home from './components/Home';
import Navbar from "./components/navbar";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>

            <Navbar/>

            <Routes>
                <Route path="/usuarios" element={<Usuarios_index/>}/>
                <Route path="/usuarios/new" element={<Usuarios_new/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </Router>
    );
}

export default App;
