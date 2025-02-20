import type { RowDataPacket } from 'mysql2/promise';

export type Generes = {
    id: number;
    name: string;
} & RowDataPacket;
