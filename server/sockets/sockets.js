const { io } = require( '../server' );

/** Escucho en el evento de conexión del Cliente. */
io .on( 'connection', ( client ) => {
    console .log( 'Usuario conectado al Servidor' );    // Registro en la consola la conexión del Socket al Servidor
});