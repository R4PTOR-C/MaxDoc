import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import './styles/login.css';
import './styles/navbar.css';
import './styles/calendar.css';
import Usuarios_index from './components/Usuarios_index';
import Login from './components/login';
import Usuarios_new from "./components/Usuarios_new";
import Home from './components/Home';
import Navbar from "./components/navbar";
import Remedios_index from "./components/Remedios_index";
import Remedios_new from "./components/Remedios_new";
import EditRemedio from "./components/Remedios_edit"; // Supondo que você tenha o componente de edição
import Lembretes_index from "./components/Lembretes_index";
import Lembretes_new from "./components/Lembretes_new";

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
                <Route path="/" element={<Login />} /> {/* Rota para Login */}
                <Route element={<Layout />}>
                    <Route path="/home" element={<Home />} /> {/* Sub-rota de /home */}
                    <Route path="/usuarios" element={<Usuarios_index />} />
                    <Route path="/usuarios/new" element={<Usuarios_new />} />
                    <Route path="/remedios" element={<Remedios_index />} />
                    <Route path="/remedios/new" element={<Remedios_new />} />
                    <Route path="/remedios/edit/:id" element={<EditRemedio />} /> {/* Rota para editar remédios */}
                    <Route path="/lembretes" element={<Lembretes_index />} />
                    <Route path="/lembretes/new" element={<Lembretes_new />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
