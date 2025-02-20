import type { Connection, ResultSetHeader } from 'mysql2/promise';
import type { Generes } from './entities';

export class ManageGeneres {
    constructor(private connection: Connection) {}

    getAllMovies = async () => {
        const q = 'select * from movies';
        const [rows] = await this.connection.query<Generes[]>(q);
        return rows;
    };

    getMoviesById = async (id: number) => {
        const q = `select * from movies where movie_id = bin_to_uuid(?)`;
        const [rows] = await this.connection.query(q, [id]);
        return rows;
    };

    createMovies = async (name: string) => {
        const q = `insert into movies (name) VALUES (?);`;
        const [result] = await this.connection.query<ResultSetHeader>(q, [
            name,
        ]);

        if (result.affectedRows === 1) {
            console.log('Movies created with id:', result.insertId);
            return this.getMoviesById(result.insertId);
        }

        return result;
    };

    updateMovies = async (id: number, name: string) => {
        const q = `update generes set name = ? where genere_id = ?;`;
        const [result] = await this.connection.query<ResultSetHeader>(q, [
            name,
            id,
        ]);

        if (result.affectedRows === 1) {
            console.log('Genere updated with id:', id);
            return this.getMoviesById(id);
        }

        return result;
    };

    deleteMovies = async (id: number) => {
        const genereForDelete = await this.getMoviesById(id);

        const q = `delete from generes where genere_id = ?;`;
        const [result] = await this.connection.query<ResultSetHeader>(q, [id]);

        if (result.affectedRows === 1) {
            console.log('Genere deleted with id:', id);
            return genereForDelete;
        }

        return result;
    };
}
