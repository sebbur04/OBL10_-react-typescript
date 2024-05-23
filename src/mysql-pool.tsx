//DATABASEKOBLINGSOPPSETT henter fra Namox serveren til NTNU med egen bruker
import mysql from 'mysql2';

// Create a cache of connections to the mysql server.
// Read more about connection pools here: https://en.wikipedia.org/wiki/Connection_pool
export let pool = mysql.createPool({
  host: 'namox.idi.ntnu.no',
  connectionLimit: 1, // Limit the number of simultaneous connections to avoid overloading the mysql server
  user: 'XXX', // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
  password: 'XXX', // Replae "password" with your mysql-ait.stud.idi.ntnu.no password
  database: 'XXX', // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
});
