import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST!,
  DB_USER: process.env.DB_USER!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_NAME: process.env.DB_NAME!,
  DB_PORT: Number(process.env.DB_PORT) || 3306,
};

/*¿Qué hace esto?

 Carga variables del .env
 Las deja listas para usar en el código
 
*/
