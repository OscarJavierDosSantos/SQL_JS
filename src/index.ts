// import { loadEnvFile, } from 'node:process';

import { openConnection } from './db.js';
//import { ManageGeneres } from './generes.js';
import { ManageMovies } from './movies.js';
process.loadEnvFile('.env');

try {
    const connection = await openConnection();
    // const manageGeneres = new ManageGeneres(connection);
    // const generes = await manageGeneres.getAllGeneres();
    // console.log(generes);
    // const result = await createGenere('War');
    // console.log(result);
    // const result2 = await updateGenere(25, 'Drama');
    // console.log(result2);
    // for (let i = 14; i < 29; i++) {
    //     const result = await deleteGenere(i);
    //     console.log(result);
    // }
    const manageMovies = new ManageMovies(connection);
    const movies = await manageMovies.getAllMovies();
    console.log('Todos las pelis',movies);
    const movieById= await manageMovies.getMoviesById('29a631d2-efae-11ef-b304-b42e99040d39');
    console.log('Pelis por id',movieById);
    const movieinsert= await manageMovies.createMovies('Pokemon',2025,'Masamitsu Hidaka',200,'https://www.imdb.com/es-es/title/tt0168366/?ref_=nv_sr_srsg_0_tt_8_nm_0_in_0_q_pokemon','7.6'));
    console.log('insert Peli',movieinsert);
    connection.end();
} catch (error) {
    if (error instanceof Error) {
        console.error(error);
    } else {
        console.error(error);
    }
}
