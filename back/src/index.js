const express = require('express');
const db = require('./db');
const bcrypt = require('bcrypt');
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
    const { nome, idade, genero, email, senha } = req.body;

    try {
        // Gerar um hash da senha
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        // Inserir o usuário com a senha hash no banco de dados
        const resultado = await db.query(
            'INSERT INTO usuarios (nome, idade, genero, email, senha) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nome, idade, genero, email, hashedPassword]
        );
        res.status(201).json(resultado.rows[0]);
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

app.post('/', async (req, res) => {
    const { email, senha } = req.body; // Certifique-se de que "senha" está sendo enviada corretamente

    try {
        // Primeiro, verifica se o e-mail existe no banco de dados
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const user = result.rows[0];
        console.log("Senha recebida:", senha); // Log para verificar a senha recebida
        console.log("Hash no banco:", user.senha); // Log para verificar o hash recuperado

        // Antes de tentar comparar, verifica se há dados suficientes
        if (!senha || !user.senha) {
            console.error("Senha ou hash da senha não fornecidos.");
            return res.status(400).json({ message: 'Dados incompletos' });
        }

        // Comparar a senha fornecida com o hash armazenado
        const match = await bcrypt.compare(senha, user.senha);
        if (!match) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        // Se a senha está correta
        res.json({ message: 'Login bem-sucedido', user: { id: user.id, nome: user.nome, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

/***************************************************remedios**********************************************************/

app.get('/remedios', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM remedios');
        console.log(rows); // Imprime os dados na console do servidor
        res.json(rows); // Envia os dados como JSON para o cliente
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

app.post('/remedios', async (req, res) => {
    const { nome, categoria, formulacao, dosagem, obs, dias_semana, horario } = req.body;
    try {
        const resultado = await db.query(
            'INSERT INTO remedios (nome, categoria, formulacao, dosagem, obs, dias_semana, horario) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nome, categoria, formulacao, dosagem, obs, dias_semana, horario]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/remedios/:id', async (req, res) => {
    const { id } = req.params; // Extrai o ID do usuário da URL

    try {
        const resultado = await db.query(
            'DELETE FROM remedios WHERE id = $1 RETURNING *', // Query para deletar o usuário baseado no ID
            [id]
        );

        if (resultado.rowCount === 0) {
            // Nenhum usuário foi encontrado/deletado
            return res.status(404).json({error: 'Remedio não encontrado'});
        }

        // Usuário deletado com sucesso, retorna o usuário deletado
        res.json(resultado.rows[0]);
    } catch (err) {
        console.error('Erro ao deletar o remedio:', err);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Rota para obter um remédio específico
app.get('/remedios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await db.query('SELECT * FROM remedios WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Remédio não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Rota para atualizar um remédio
app.put('/remedios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, categoria, formulacao, dosagem, obs, dias_semana, horario } = req.body;
    try {
        const resultado = await db.query(
            'UPDATE remedios SET nome = $1, categoria = $2, formulacao = $3, dosagem = $4, obs = $5, dias_semana = $6, horario = $7 WHERE id = $8 RETURNING *',
            [nome, categoria, formulacao, dosagem, obs, dias_semana, horario, id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Remédio não encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/***************************************************lembretes**********************************************************/

app.get('/lembretes', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM lembretes');
        console.log(rows); // Imprime os dados na console do servidor
        res.json(rows); // Envia os dados como JSON para o cliente
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Rota para criar um novo lembrete
app.post('/lembretes', async (req, res) => {
    const { remedio_id, descricao, data } = req.body;
    try {
        const resultado = await db.query(
            'INSERT INTO lembretes (remedio_id, descricao, data) VALUES ($1, $2, $3) RETURNING *',
            [remedio_id, descricao, data]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Rota para atualizar um lembrete
app.put('/lembretes/:id', async (req, res) => {
    const { id } = req.params;
    const { remedio_id, descricao, data } = req.body;
    try {
        const resultado = await db.query(
            'UPDATE lembretes SET remedio_id = $1, descricao = $2, data = $3 WHERE id = $4 RETURNING *',
            [remedio_id, descricao, data, id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Lembrete não encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Rota para deletar um lembrete
app.delete('/lembretes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.query('DELETE FROM lembretes WHERE id = $1 RETURNING *', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Lembrete não encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
