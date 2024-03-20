import React, { useState, useEffect } from 'react';

const Usuarios_index = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3001/usuarios')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return response.json();
            })
            .then(data => {
                setUsuarios(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar dados dos usuários:", error);
                setError(error.toString());
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div>
            <h1>Usuários</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>{usuario.nome} - {usuario.idade}</li>
                ))}
            </ul>
        </div>
    );
}

export default Usuarios_index;
