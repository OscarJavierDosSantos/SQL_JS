import { loadEnvFile } from 'process';
import { getAllGeneres, openConnection } from './db.js';

loadEnvFile('.env');

try {
    //tipado tupla = const r: [mysql.QueryResult, mysql.FieldPacket[]]
    const connection = await openConnection();
    if (!connection) {
        throw new Error('Failed to open connection');
    }
    const generes = await getAllGeneres(connection);
    console.log(generes);
} catch (error) {
    console.error((error as Error).message);
}
