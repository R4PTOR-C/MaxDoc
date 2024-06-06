import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Remedios_index = () => {
    const [remedios, setRemedios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        //maxdoc.onrender.com
        fetch(`${process.env.REACT_APP_API_URL}/remedios`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return response.json();
            })
            .then(data => {
                setRemedios(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar dados de remedios:", error);
                setError(error.toString());
                setLoading(false);
            });
    }, []);

    const deleteRemedio = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/remedios/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao deletar o remedio');
                }
                // Filtra o usuário deletado fora do estado de usuários
                setRemedios(remedios.filter(remedio => remedio.id !== id));
            })
            .catch(error => {
                console.error("Erro ao deletar o usuário:", error);
                alert(error.message);
            });
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div className="overflow-auto">
            <h1 className="text-2xl font-bold mb-4">Remedios</h1>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Nome</th>
                        <th scope="col" className="px-6 py-3">Categoria</th>
                        <th scope="col" className="px-6 py-3">Formulação</th>
                        <th scope="col" className="px-6 py-3">Dosagem</th>
                        <th scope="col" className="px-6 py-3">Observação</th>
                        <th scope="col" className="px-6 py-3">Dias da Semana</th>
                        <th scope="col" className="px-6 py-3">Horário</th>
                        <th scope="col" className="px-6 py-3">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {remedios.map(remedio => (
                        <tr key={remedio.id}>
                            <th scope="row" className="px-6 py-4">{remedio.id}</th>
                            <td className="px-6 py-4">{remedio.nome}</td>
                            <td className="px-6 py-4">{remedio.categoria}</td>
                            <td className="px-6 py-4">{remedio.formulacao}</td>
                            <td className="px-6 py-4">{remedio.dosagem}</td>
                            <td className="px-6 py-4">{remedio.obs}</td>
                            <td className="px-6 py-4">{remedio.dias_semana ? remedio.dias_semana.join(', ') : ''}</td>
                            <td className="px-6 py-4">{remedio.horario}</td>
                            <td className="px-6 py-4">
                                <Link to={`/remedios/edit/${remedio.id}`}>
                                    <img src='./edit.png' alt="Ícone de editar" className="edit-btn" />
                                </Link>
                                <img src='./delete.png' alt="Ícone de delete" className="delete-btn"
                                     onClick={() => deleteRemedio(remedio.id)} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Link to="/remedios/new" className="btn btn-outline-dark mb-3">Adicionar Remedio</Link>
            </div>
        </div>
    );
}

export default Remedios_index;
