const { Pool } = require('pg');

const pool = new Pool({
    user: 'maxdoc_db_user', // usuário do banco de dados remoto
    host: 'dpg-co0o3cun7f5s73997qeg-a.oregon-postgres.render.com', // host do banco de dados remoto
    database: 'maxdoc_db', // nome do banco de dados remoto
    password: 'g6CbDHhVeDjA4tCvzEYMDe1Bg1pQGNSu', // senha do banco de dados remoto
    port: 5432, // a porta em que o seu banco de dados remoto está rodando
    ssl: {
        rejectUnauthorized: false // necessário se o servidor requer SSL, mas o certificado é auto-assinado ou não confiável
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
