import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Remedios_new() {
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [formulacao, setFormulacao] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [obs, setObs] = useState('');
    const [diasSemana, setDiasSemana] = useState([]);
    const [horario, setHorario] = useState('');

    const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    const handleCheckboxChange = (dia) => {
        setDiasSemana(prevState =>
            prevState.includes(dia)
                ? prevState.filter(d => d !== dia)
                : [...prevState, dia]
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const remedio = { nome, categoria, formulacao, dosagem, obs, dias_semana: diasSemana, horario };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/remedios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(remedio),
            });

            if (response.ok) {
                alert('Remédio adicionado com sucesso!');
                // Resetar o formulário ou redirecionar o usuário
            } else {
                alert('Falha ao adicionar remédio.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar ao servidor.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Adicionar Novo Remédio</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Categoria</label>
                    <input
                        type="text"
                        className="form-control"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Formulação</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formulacao}
                        onChange={(e) => setFormulacao(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Dosagem</label>
                    <input
                        type="text"
                        className="form-control"
                        value={dosagem}
                        onChange={(e) => setDosagem(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Observações</label>
                    <textarea
                        className="form-control"
                        value={obs}
                        onChange={(e) => setObs(e.target.value)}
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
                                checked={diasSemana.includes(dia)}
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
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Adicionar</button>
            </form>
        </div>
    );
}

export default Remedios_new;
