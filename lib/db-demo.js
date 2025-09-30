import mysql from "mysql2/promise";

export async function getUsers() {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD, // your MySQL password
    database: "scanrfid",  // your database name
    port: 3306
  });

  const [rows] = await db.query("SELECT * FROM employee");

  await db.end();   // close the db connection

  return rows;
}