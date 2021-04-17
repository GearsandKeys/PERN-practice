//connecting our Postgres db
const Pool = require("pg").Pool; //pg is postgres....

const pool = new Pool({
    user: "postgres",
    password: "postgres", //lame password since it'll be on my github
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

module.exports = pool; //export it out