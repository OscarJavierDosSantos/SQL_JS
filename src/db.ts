import mysql, { ResultSetHeader } from 'mysql2/promise';
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

export const getGenereById = async (connection: Connection, id: number) => {
    const q = `SELECT genere_id as ID,name as NAME FROM generes where genere_id=?`;
    const [rows] = await connection.query<Generes[]>(q, [id]);
    return rows;
};

export const updateGenere = async (
    connection: Connection,
    name: string,
    id: number,
) => {
    const q = `UPDATE generes SET name = ?  WHERE genere_id = ?;`;
    const [result] = await connection.query<ResultSetHeader>(q, [name, id]);
    if (result.affectedRows === 1) {
        console.log('Genere create with id :', id);
        return getGenereById(connection, id);
    }
    return result;
};

// placeholder
export const createGenere = async (connection: Connection, name: string) => {
    const q = 'insert into generes (name) VALUES (?);';
    const [result] = await connection.query<ResultSetHeader>(q, [name]);
    if (result.affectedRows === 1) {
        console.log('Genere create with id :', result.insertId);
        return getGenereById(connection, result.insertId);
    }
    return result;
};
