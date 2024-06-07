const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Proyek TBD",
  password: "05071006",
  port: 5432,
});

module.exports = pool;