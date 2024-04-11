const express = require('express');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001; // Render vai fornecer a PORT
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/usuarios', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM usuarios');
        console.log(rows); // Imprime os dados na console do servidor
        res.json(rows); // Envia os dados como JSON para o cliente
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

app.post('/usuarios', async (req, res) => {
    const { nome, idade, genero, email } = req.body; // Extrai os dados do corpo da solicitação
    try {
        const resultado = await db.query(
            'INSERT INTO usuarios (nome, idade, genero, email, senha) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nome, idade, genero, email, senha]
        );
        res.status(201).json(resultado.rows[0]); // Retorna o usuário inserido
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params; // Extrai o ID do usuário da URL

    try {
        const resultado = await db.query(
            'DELETE FROM usuarios WHERE id = $1 RETURNING *', // Query para deletar o usuário baseado no ID
            [id]
        );

        if (resultado.rowCount === 0) {
            // Nenhum usuário foi encontrado/deletado
            return res.status(404).json({error: 'Usuário não encontrado'});
        }

        // Usuário deletado com sucesso, retorna o usuário deletado
        res.json(resultado.rows[0]);
    } catch (err) {
        console.error('Erro ao deletar o usuário:', err);
        res.status(500).json({error: 'Internal server error'});
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
