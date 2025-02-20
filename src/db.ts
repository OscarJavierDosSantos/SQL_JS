import mysql from 'mysql2/promise';
import { Connection } from 'mysql2/promise';
import { Generes } from './entities';

export const openConnection = async () => {
    const dataConnection = {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWD,
        database: process.env.DB_NAME,
    };
    let connection;
    try {
        connection = await mysql.createConnection(dataConnection);
        console.log(
            'Conection to server :',
            connection.config.host,
            connection.config.database,
        );
    } catch (error) {
        console.error((error as Error).message);
    }
    return connection;
};

export const getAllGeneres = async (connection: Connection) => {
    const query = 'SELECT genere_id as ID,name as NAME FROM generes';
    const [rows] = await connection.query<Generes[]>(query);
    return rows;
};
