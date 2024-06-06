import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function RemediosEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [remedio, setRemedio] = useState({
        nome: '',
        categoria: '',
        formulacao: '',
        dosagem: '',
        obs: '',
        dias_semana: [],
        horario: ''
    });

    const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    useEffect(() => {
        async function fetchRemedio() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/remedios/${id}`);
                if (!response.ok) {
                    throw new Error('Falha ao carregar o remédio');
                }
                const data = await response.json();
                setRemedio(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchRemedio();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/remedios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(remedio)
            });
            if (!response.ok) {
                throw new Error('Falha ao editar o remédio');
            }
            navigate('/remedios');
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRemedio(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (dia) => {
        setRemedio(prevState => ({
            ...prevState,
            dias_semana: prevState.dias_semana.includes(dia)
                ? prevState.dias_semana.filter(d => d !== dia)
                : [...prevState.dias_semana, dia]
        }));
    };

    return (
        <div className="container mt-5">
            <h2>Editar Remédio</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nome"
                        value={remedio.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Categoria</label>
                    <input
                        type="text"
                        className="form-control"
                        name="categoria"
                        value={remedio.categoria}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Formulação</label>
                    <input
                        type="text"
                        className="form-control"
                        name="formulacao"
                        value={remedio.formulacao}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Dosagem</label>
                    <input
                        type="text"
                        className="form-control"
                        name="dosagem"
                        value={remedio.dosagem}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Observações</label>
                    <textarea
                        className="form-control"
                        name="obs"
                        value={remedio.obs}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Dias da Semana</label>
                    {dias.map(dia => (
                        <div key={dia} className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={dia}
                                value={dia}
                                checked={remedio.dias_semana.includes(dia)}
                                onChange={() => handleCheckboxChange(dia)}
                            />
                            <label className="form-check-label" htmlFor={dia}>{dia}</label>
                        </div>
                    ))}
                </div>
                <div className="form-group">
                    <label>Horário</label>
                    <input
                        type="time"
                        className="form-control"
                        name="horario"
                        value={remedio.horario}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default RemediosEdit;
