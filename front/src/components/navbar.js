import React from 'react';
import { Link } from 'react-router-dom'; // Importe isso se você estiver usando react-router para a navegação

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#b82f27'}}>
            <div className="container-fluid">
                <div className="flex-container">
                    <h1 className="logo-text-nav">MAX</h1>
                    <img className="logo-image-nav" src='./maxdoc-logo.png' alt="Logo Descrição"/>
                    <h1 className="logo-text-nav">DOC</h1>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto"> {/* ms-auto empurra os itens para a direita */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                Medicamentos
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Estoque</a></li>
                                <li><a className="dropdown-item" href="#">Adicionar remédio</a></li>
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
                        <img src="./usuario.png" alt="Descrição da Imagem" className="logo-image-nav"/>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;
