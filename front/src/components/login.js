import React, {useState} from 'react';
import {redirect, useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Envio dos dados para o servidor
        fetch(`${process.env.REACT_APP_API_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Login bem-sucedido') {
                    navigate('/home');
                } else {
                    alert(data.message); // Exibe mensagem de erro do servidor
                }
            })
            .catch(error => console.error('Erro ao fazer login:', error));
    };


    return (
        <div className="login-page">
            <div className="welcome-section">
                <div className="flex-container">
                    <h1 className="logo-text">MAX</h1>
                    <img className="logo-image" src='./maxdoc-logo.png' alt="Descrição da Imagem"/>
                    <h1 className="logo-text">DOC</h1>
                </div>
                <p></p>
            </div>
            <div className="login-section">
                <div className="login-container">
                    <h2 className="login-title">USER LOGIN</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="login-input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className="login-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="login-remember">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                Remember
                            </label>
                            <a href="#">Forgot password?</a>
                        </div>
                        <button type="submit" className="login-btn">LOGIN</button>
                        <p> Não tem conta ? <a  href="usuarios/new">Cadastre-se grátis.</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Login;
