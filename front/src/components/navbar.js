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
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#b82f27'}}>
            <div className="container-fluid">
                <a href="/home" style={{textDecoration: 'none'}}>
                <div className="flex-container">
                    <h1 className="logo-text-nav">MAX</h1>
                    <img className="logo-image-nav" src='./maxdoc-logo.png' alt="Logo Descrição"/>
                    <h1 className="logo-text-nav">DOC</h1>
                </div>
                </a>
                <button ref={hamburgerRef} className="hamburger" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                </button>

                {/* Itens de navegação no lado direito */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown mx-auto" style={{padding: '10px'}}>
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                Medicamentos
                            </a>
                            <ul className="dropdown-menu ">
                                <li><a className="dropdown-item" href="/remedios">Estoque</a></li>
                                <li><a className="dropdown-item" href="/remedios/new">Adicionar remédio</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                Lembretes
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Checar Lembretes</a></li>
                                <li><a className="dropdown-item" href="#">Criar Lembrete</a></li>
                            </ul>
                        </li>
                    </ul>
                    <img src="./usuario.png" alt="Descrição da Imagem" className="logo-image-nav"/>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;
