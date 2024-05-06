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


    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (

        <div className="overflow-auto">
            <h1 className="text-2xl font-bold mb-4">Remedios</h1>
            <Link to="/usuarios/new" className="btn btn-outline-dark mb-3">Adicionar Remedio</Link>
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
                    </tr>
                    </thead>
                    <tbody>
                    {remedios.map(remedios => (
                        <tr key={remedios.id}>
                            <th scope="row" className="px-6 py-4">{remedios.id}</th>
                            <td className="px-6 py-4">{remedios.nome}</td>
                            <td className="px-6 py-4">{remedios.idade}</td>
                            <td className="px-6 py-4">{remedios.genero}</td>
                            <td className="px-6 py-4">{remedios.email}</td>


                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default Remedios_index;
