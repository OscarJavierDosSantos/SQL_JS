import { UUID } from 'crypto';
import type { RowDataPacket } from 'mysql2/promise';

// interface Category extends mysql.RowDataPacket {
//     id: number;
//     name: string;
// };

export type Generes = {
    id: number;
    name: string;
} & RowDataPacket;

export type Movies = {
    movie_id: UUID;
    title: string;
    release_year: number;
    director: string;
    duration: number;
    poster: string;
    rate: number;
} & RowDataPacket;
