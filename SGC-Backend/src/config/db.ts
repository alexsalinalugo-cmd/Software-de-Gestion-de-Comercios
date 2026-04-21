import mysql from "mysql2/promise";
import { ENV } from "./env";

export const pool = mysql.createPool({
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  port: ENV.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
});

/*
Explicación importante
 createPool

 crea varias conexiones reutilizables

 connectionLimit: 10

 máximo 10 conexiones simultáneas

 waitForConnections: true

 si no hay conexión disponible → espera
(no rompe el sistema)
*/
