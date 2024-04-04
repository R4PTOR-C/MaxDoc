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
            'INSERT INTO usuarios (nome, idade, genero, email) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, idade, genero, email]
        );
        res.status(201).json(resultado.rows[0]); // Retorna o usuário inserido
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await db.query('DELETE FROM usuarios WHERE id = $1', [id]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(204).send(); // No Content
    } catch (error) {
        console.error("Erro ao deletar o usuário:", error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
