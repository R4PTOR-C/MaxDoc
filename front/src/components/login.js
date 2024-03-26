import React, {useState} from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Adicione aqui a lógica de autenticação
    };

    return (
        <div className="login-page">
            <div className="welcome-section">
                <div className="flex-container">
                    <h1 className="logo-text">MAX</h1>
                    <img className="logo-image" src='./maxdoc-logo.png' alt="Descrição da Imagem"/>
                    <h1 className="logo-text">DOC</h1>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                    laoreet dolore magna aliquam erat volutpat.</p>
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
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Login;
