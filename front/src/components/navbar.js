import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe Link de react-router-dom para navegação

function Navbar() {
    const [isActive, setIsActive] = useState(false); // State para controlar a visibilidade do menu

    const toggleMenu = () => {
        setIsActive(!isActive); // Alterna o estado do menu
    };

    return (
        <header className="navBar">
            <nav className="nav">
                <div className="logo">
                    <h1 className="logoTxt">MAX</h1>
                    <img className="logoimg" src="/maxdoc-logo.png" alt="Logo MAXDOC" width="30" height="30" />
                    <h1 className="logoTxt">DOC</h1>
                </div>
                <button className="hamburger" onClick={toggleMenu}></button>
                <ul className={`navList ${isActive ? 'active' : ''}`}> {/* Toggle classes based on state */}
                    <li>
                        <Link to="/"><button className="botao">Início</button></Link>
                    </li>
                    <li>
                        <button className="botao">Medicamentos<i className='bx bx-down-arrow-alt'></i></button>
                        <div className="submenu1">
                            <ul>
                                <li><Link to="#">Estoque</Link></li>
                                <li><Link to="/medicamentos">Adicionar remédio</Link></li>
                                <li><Link to="#">Remover remédio</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <button className="botao">Lembretes<i className='bx bx-down-arrow-alt'></i></button>
                        <div className="submenu1">
                            <ul>
                                <li><Link to="#">Checar Lembretes</Link></li>
                                <li><Link to="/lembrete">Criar lembrete</Link></li>
                                <li><Link to="#">Apagar lembrete</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link to="#"><img src="/usuario.png" alt="ftUsuario" width="30" height="30" /></Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
