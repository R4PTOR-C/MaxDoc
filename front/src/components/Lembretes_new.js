import React, { useState } from 'react';

function Lembretes_new() {
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const remedio = { descricao, data };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/lembretes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(remedio),
            });

            if (response.ok) {
                alert('Lembretes adicionado com sucesso!');
                // Resetar o formulário ou redirecionar o usuário
            } else {
                alert('Falha ao adicionar lembretes.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar ao servidor.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Adicionar Novo Lembrete</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Descriçao</label>
                    <input
                        type="text"
                        className="form-control"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Data</label>
                    <input
                        type="date"
                        className="form-control"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Adicionar</button>
            </form>
        </div>
    );
}

export default Lembretes_new;
