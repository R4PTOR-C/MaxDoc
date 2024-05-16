import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    const hamburgerRef = useRef(null);

    useEffect(() => {
        const hamburger = hamburgerRef.current;
        if (hamburger) {
            const toggleClass = () => {
                hamburger.classList.toggle('active');
            };
            hamburger.addEventListener('click', toggleClass);

            // Limpeza do evento
            return () => {
                hamburger.removeEventListener('click', toggleClass);
            };
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#b82f27' }}>
            <div className="container-fluid">
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <div className="flex-container">
                        <h1 className="logo-text-nav">MAX</h1>
                        <img className="logo-image-nav" src='./maxdoc-logo.png' alt="Logo Descrição" />
                        <h1 className="logo-text-nav">DOC</h1>
                    </div>
                </Link>
                <button
                    ref={hamburgerRef}
                    className={`navbar-toggler ${isActive ? 'active' : ''}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded={isActive}
                    aria-label="Toggle navigation"
                    onClick={toggleMenu}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isActive ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown mx-auto">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Medicamentos
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/remedios">Estoque</Link></li>
                                <li><Link className="dropdown-item" to="/remedios/new">Adicionar remédio</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Lembretes
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/lembretes">Checar Lembretes</Link></li>
                                <li><Link className="dropdown-item" to="/lembretes/new">Criar Lembrete</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <img src="./usuario.png" alt="Descrição da Imagem" className="logo-image-nav" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
