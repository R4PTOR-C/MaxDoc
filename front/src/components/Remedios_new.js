import React, { useState } from 'react';

function Remedios_new() {
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [formulacao, setFormulacao] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [obs, setObs] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        const remedio = { nome, categoria, formulacao, dosagem, obs };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/remedios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(remedio),
            });

            if (response.ok) {
                alert('Remedio adicionado com sucesso!');
                // Resetar o formulário ou redirecionar o usuário
            } else {
                alert('Falha ao adicionar remedio.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar ao servidor.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Adicionar Novo Remedio</h2>
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
                    <label>Observação</label>
                    <input
                        type="text"
                        className="form-control"
                        value={obs}
                        onChange={(e) => setObs(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Adicionar</button>
            </form>
        </div>
    );
}

export default Remedios_new;
