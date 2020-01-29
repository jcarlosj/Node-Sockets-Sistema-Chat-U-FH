const express = require( 'express' ),
      app = express(),
      socketIO = require( 'socket.io' ),
      /** Dependencias Nativas */
      http = require( 'http' ),
      path = require( 'path' ),
      /** Proyecto */
      publicPath = path .resolve( __dirname, '../public' ),
      server = http .createServer( app ),       // Configuración de http con Express
      io = socketIO( server ),                  /* Inicializa el servicio de Sockets con el Servidor. Mantiene Conexión Activa con el BackEnd
                                                   NOTA: Como la nombre en el BackEnd debo invocarla en el FrontEnd en este caso 'io'
                                                */
      /** Variables de Entorno */
      port = process.env.PORT || 3000;

/** Middlewares */
app .use( express .static( publicPath ) );

/** Sockets */
module .exports .io = io;         // Exporta configuración de Sockets, para que sea usada en cualquier parte de la aplicación 
require( './sockets/sockets' );   // Importa el archivo de Programación de Sockets para la App

/** Lanza el Servidor */
server .listen( port, ( error ) => {
    if ( error ) throw new Error( error ) ;
    console .log( `Servidor lanzado en http://localhost:${ port }` );
}); 