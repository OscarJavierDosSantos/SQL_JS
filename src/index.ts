import { loadEnvFile } from 'process';
import {
    createGenere,
    getAllGeneres,
    openConnection,
    updateGenere,
} from './db.js';

loadEnvFile('.env');

try {
    //tipado tupla = const r: [mysql.QueryResult, mysql.FieldPacket[]]
    const connection = await openConnection();
    const generes = await getAllGeneres(connection);
    console.log(generes);
    const result = await createGenere(connection, 'war');
    console.log(result);
    const result2 = await updateGenere(connection, 'war30', 31);
    console.log(resul2);

    connection?.end();
} catch (error) {
    console.error((error as Error).message);
}
