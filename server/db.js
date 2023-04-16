const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "12qwert*34",
  port: 5432,
  database: "authtodo"
});

module.exports = pool;