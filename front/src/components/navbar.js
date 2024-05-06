import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <header className="navBar">
            <nav className={`nav ${isActive ? 'active' : ''}`}>
                <Link to="/home" style={{textDecoration: 'none'}}>
                <div  className="logo">
                    <h1 className="logoTxt">MAX</h1>
                    <img className="logoimg" src="/maxdoc-logo.png" width="40" height="auto" alt="MaxDoc Logo" />
                    <h1 className="logoTxt">DOC</h1>
                </div>
                </Link>
                <button className="hamburger" onClick={toggleMenu}></button>
                <ul className="navList">
                    <li>
                        <button className="botao">Medicamentos<i className='bx bx-down-arrow'></i></button>
                        <div className="submenu1">
                            <ul>
                                <li><Link to="/remedios">Estoque</Link></li>
                                <li><Link to="/remedios/new">Adicionar remédio</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <button className="botao">Lembretes<i className='bx bx-down-arrow'></i></button>
                        <div className="submenu1">
                            <ul>
                                <li><Link to="/chegar-lembretes">Chegar Lembretes</Link></li>
                                <li><Link to="/criar-lembrete">Criar lembrete</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li><Link to="/perfil"><img src="/usuario.png" alt="Foto do usuário" width="40" height="auto" /></Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
