import type { Connection, ResultSetHeader } from 'mysql2/promise';
import type { Movie, MovieRow } from './entities';
import { UUID } from 'crypto';

export class ManageMovies {
    constructor(private connection: Connection) {}

    getAllMovies = async () => {
        const q = `SELECT
            bin_to_uuid(movie_id) as id,
            title,
            release_year as year,
            director,
            duration,
            poster,
            rate 
            FROM movies`;
        const [rows] = await this.connection.query<MovieRow[]>(q);
        return rows;
    };

    async getAllMoviesWithGeneres(): Promise<Movie[]> {
        console.log('Open getAllMoviesWithGeneres');
        const q = `select 
                    BIN_TO_UUID(m.movie_id) as id, 
                    title, 
                    release_year as year, 
                    director, 
                    duration, 
                    poster, 
                    rate,
                    name as genere 
                from movies m
                join movies_generes mg on m.movie_id = mg.movie_id
                join generes g on mg.genere_id = g.genere_id`;

        const [rows] = await this.connection.query<MovieRow[]>(q);
        const ids = Array.from(new Set(rows.map((row) => row.movie_id)));

        const movies = ids.map((id) => {
            const movie = rows.find((row) => row.id === id);
            return {
                ...movie,
                generes: rows
                    .filter((row) => row.id === id)
                    .map((row) => row.genere as unknown as string),
            };
        });

        return movies as Movie[];
    }

    getMoviesById = async (id: UUID) => {
        const q = `SELECT
            bin_to_uuid(movie_id) as movie_id,
            title,
            release_year,
            director,
            duration,
            poster,
            rate 
            FROM movies_db.movies 
            where movie_id = uuid_to_bin(?)`;
        const [rows] = await this.connection.query(q, [id]);
        return rows;
    };
    // del profe
    // async findMovieById(id: string): Promise<MovieRow> {
    //     const q = `select
    //                 BIN_TO_UUID(movie_id) as id,
    //                 title,
    //                 release_year as year,
    //                 director,
    //                 duration,
    //                 poster,
    //                 rate
    //             from movies where movie_id = UUID_TO_BIN(?)`;
    //     const [rows] = await this.connection.query<MovieRow[]>(q, [id]);
    //     if (rows.length !== 1) {
    //         throw new Error('Movie not found');
    //     }
    //     return rows[0];
    // }
    createMovies = async (
        title: string,
        year: number,
        director: string,
        duration: number,
        poster: string,
        rate: string,
    ) => {
        const uuid = crypto.randomUUID();
        const q =
            'INSERT INTO movies(movie_id,title,release_year,director,duration,poster,rate) VALUES (uuid_to_bin(?),?,?,?,?,?,?);';

        const [result] = await this.connection.query<ResultSetHeader>(q, [
            uuid,
            title,
            year,
            director,
            duration,
            poster,
            rate,
        ]);

        if (result.affectedRows === 1) {
            console.log('Movies created with id:', uuid);
            return this.getMoviesById(uuid);
        }

        return result;
    };

    updateMovie = async (id: number, name: string) => {
        const q = `update generes set name = ? where genere_id = ?;`;
        const [result] = await this.connection.query<ResultSetHeader>(q, [
            name,
            id,
        ]);

        if (result.affectedRows === 1) {
            console.log('Genere updated with id:', id);
            return this.getMoviesById(uuid);
        }

        return result;
    };

    deleteMovies = async (id: number) => {
        const movieForDelete = await this.getMoviesById(id);

        const q = `delete from generes where genere_id = ?;`;
        const [result] = await this.connection.query<ResultSetHeader>(q, [id]);

        if (result.affectedRows === 1) {
            console.log('Genere deleted with id:', id);
            return movieForDelete;
        }

        return result;
    };
}
