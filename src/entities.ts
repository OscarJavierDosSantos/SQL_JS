import { UUID } from 'crypto';
import type { RowDataPacket } from 'mysql2/promise';

export type SqlError = {
    code: string;
    errno: number;
    sqlState: string;
    sqlMessage: string;
} & Error;

// interface Category extends mysql.RowDataPacket {
//     id: number;
//     name: string;
// };

export type Genere = {
    id: number;
    name: string;
};

export type GenereRow = Genere & RowDataPacket;

export type Movie = {
    id: UUID;
    title: string;
    year: number;
    director: string;
    duration: number;
    poster: string;
    rate: number;
    genere?: string[];
};

export type MovieRow = Movie & RowDataPacket;
