import React from 'react';
import { Link } from 'react-router-dom'; // Importe isso se você estiver usando react-router para a navegação

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#b82f27'}}>
            <div className="container-fluid">
                <div className="flex-container">
                    <h1 className="logo-text-nav">MAX</h1>
                    <img className="logo-image-nav" src='./maxdoc-logo.png' alt="Descrição da Imagem"/>
                    <h1 className="logo-text-nav">DOC</h1>
                </div>
                <p></p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
