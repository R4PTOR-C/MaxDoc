import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Usuarios_index = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        //maxdoc.onrender.com
        fetch('http://maxdoc.onrender.com/usuarios')
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

    const deleteUser = (id) => {
        fetch(`http://maxdoc.onrender.com/usuarios/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao deletar o usuário');
                }
                // Filtra o usuário deletado fora do estado de usuários
                setUsuarios(usuarios.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error("Erro ao deletar o usuário:", error);
                alert(error.message);
            });
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (

        <div className="overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4">Usuários</h1>
            <Link to="/usuarios/new" type="button" class="btn btn-outline-dark" >Adicionar Usuario</Link>
            <div className="min-w-full">
            <table className="table table-hover w-full text-left">
                    <thead className="bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Nome</th>
                        <th scope="col" className="px-6 py-3">Idade</th>
                        <th scope="col" className="px-6 py-3">Gênero</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id} className="border-b">
                            <th scope="row" className="px-6 py-4">{usuario.id}</th>
                            <td className="px-6 py-4">{usuario.nome}</td>
                            <td className="px-6 py-4">{usuario.idade}</td>
                            <td className="px-6 py-4">{usuario.genero}</td>
                            <td className="px-6 py-4">{usuario.email}</td>
                            <td className="px-6 py-4">
                                <button onClick={() => deleteUser(usuario.id)} className="delete-btn"
                                        title="Deletar Usuário">
                                    <img src='./delete.png' alt="Ícone de delete"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>


    );
}

export default Usuarios_index;
