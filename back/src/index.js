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


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
