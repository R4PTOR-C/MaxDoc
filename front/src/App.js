import React from 'react';
import {BrowserRouter as Router, Route, Routes, Outlet} from 'react-router-dom';
import './styles/App.css';
import './styles/login.css';
import './styles/navbar.css'
import Usuarios_index from './components/Usuarios_index';
import Login from './components/login';
import Usuarios_new from "./components/Usuarios_new";
import Home from './components/Home';
import Navbar from "./components/navbar";
import Remedios_index from "./components/Remedios_index";

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/" element={<Layout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="usuarios" element={<Usuarios_index />} />
                    <Route path="usuarios/new" element={<Usuarios_new />} />
                    <Route path="remedios" element={<Remedios_index />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
