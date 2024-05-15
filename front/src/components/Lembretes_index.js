import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Lembretes_index = () => {
    const [lembretes, setLembretes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        //maxdoc.onrender.com
        fetch(`${process.env.REACT_APP_API_URL}/lembretes`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return response.json();
            })
            .then(data => {
                setLembretes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar dados de remedios:", error);
                setError(error.toString());
                setLoading(false);
            });
    }, []);

    const deleteLembrete = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/lembretes/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao deletar o remedio');
                }
                // Filtra o usuário deletado fora do estado de usuários
                setLembretes(lembretes.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error("Erro ao deletar o lembrete:", error);
                alert(error.message);
            });
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (

        <div className="overflow-auto">
            <h1 className="text-2xl font-bold mb-4">Lembretes</h1>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Descrição</th>
                        <th scope="col" className="px-6 py-3">Data</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lembretes.map(lembrete => (
                        <tr key={lembrete.id}>
                            <th scope="row" className="px-6 py-4">{lembrete.id}</th>
                            <td className="px-6 py-4">{lembrete.descricao}</td>
                            <td className="px-6 py-4">{lembrete.data}</td>
                            <td className="px-6 py-4">
                                <Link to={`/remedios/edit/${lembrete.id}`}>
                                    <img src='./edit.png' alt="Ícone de editar" className="edit-btn" />
                                </Link>
                                <img src='./delete.png' alt="Ícone de delete" className="delete-btn"
                                     onClick={() => deleteLembrete(lembrete.id)}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Link to="/lembretes/new" className="btn btn-outline-dark mb-3">Adicionar Lembrete</Link>

            </div>
        </div>
    );
}


export default Lembretes_index;
