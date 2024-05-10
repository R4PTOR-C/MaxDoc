import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditRemedio = () => {
    const { id } = useParams(); // Extrai o ID da URL
    const navigate = useNavigate(); // Navegação programática
    const [remedio, setRemedio] = useState({
        nome: '',
        categoria: '',
        formulacao: '',
        dosagem: '',
        obs: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/remedios/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar o remédio');
                }
                const data = await response.json();
                setRemedio(data);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
                setError(error.toString());
            }
        };

        fetchData();
    }, [id]); // Não esqueça de incluir `id` nas dependências, se for dinâmico


    const handleChange = (e) => {
        const { name, value } = e.target;
        setRemedio({ ...remedio, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/remedios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(remedio),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar o remédio');
                }
                return response.json();
            })
            .then(data => {
                console.log('Atualização bem-sucedida:', data);
                navigate('/remedios'); // Redireciona de volta à lista de remédios
            })
            .catch(error => {
                console.error('Erro ao atualizar o remédio:', error);
                alert(error.message);
            });
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Editar Remédio</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        className="form-control"
                        value={remedio.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="categoria" className="form-label">Categoria</label>
                    <input
                        type="text"
                        id="categoria"
                        name="categoria"
                        className="form-control"
                        value={remedio.categoria}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="formulacao" className="form-label">Formulação</label>
                    <input
                        type="text"
                        id="formulacao"
                        name="formulacao"
                        className="form-control"
                        value={remedio.formulacao}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="dosagem" className="form-label">Dosagem</label>
                    <input
                        type="text"
                        id="dosagem"
                        name="dosagem"
                        className="form-control"
                        value={remedio.dosagem}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="obs" className="form-label">Observação</label>
                    <textarea
                        id="obs"
                        name="obs"
                        className="form-control"
                        rows="4"
                        value={remedio.obs}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn ">Salvar</button>
            </form>
        </div>

    );
};

export default EditRemedio;
