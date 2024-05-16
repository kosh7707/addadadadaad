const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost', 
    user: 'asdf1234',
    password: 'root',
    database: 'cloudtermproject',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000, 
    connectionTimeoutMillis: 2000,
})

module.exports = pool;