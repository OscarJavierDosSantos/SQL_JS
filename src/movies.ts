import type { Connection, ResultSetHeader } from 'mysql2/promise';
import type { Movies } from './entities';

export class ManageMovies {
    constructor(private connection: Connection) {}

    getAllMovies = async () => {
        const q = 'SELECT bin_to_uuid(movie_id) as movie_id,title,release_year,director,duration,poster,rate FROM movies_db.movies;';
        const [rows] = await this.connection.query<Movies[]>(q);
        return rows;
    };

    getMoviesById = async (id: number) => {
        const q = 'SELECT bin_to_uuid(movie_id) as movie_id,title,release_year,director,duration,poster,rate FROM movies_db.movies where movie_id = uuid_to_bin(?)'
        const [rows] = await this.connection.query(q, [id]);
        return rows;
    };

    createMovies = async (title: string,release_year:number,director:string,duration:number,poster:string,rate:string) => {
        const q = 'INSERT INTO movies(movie_id,title,release_year,director,duration,poster,rate) VALUES (uuid_to_bin(uuid()),?,?,?,?,?,?);'

        const [result] = await this.connection.query<ResultSetHeader>(q, [title,release_year,director,duration,poster,rate]);
        console.log(result);

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
