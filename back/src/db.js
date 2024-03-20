const { Pool } = require('pg');

const pool = new Pool({
    user: 'rafael', // seu usuário do PostgreSQL
    host: 'localhost',
    database: 'maxdoc', // o nome do seu banco de dados
    password: '29510102', // sua senha do PostgreSQL
    port: 5432 // a porta em que o seu PostgreSQL está rodando
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
