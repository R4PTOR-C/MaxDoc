const express = require('express');
const db = require('./db');
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 3001; // Render vai fornecer a PORT
const cors = require('cors');
app.use(cors());

app.use(express.json());

// Definição das rotas para remédios
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

module.exports = router;
