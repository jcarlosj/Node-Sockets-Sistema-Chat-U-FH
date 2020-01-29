/** Sockets */
var socket = io();      // Como la hemos definido en el BackEnd debemos invocarla en el FrontEnd. En nuestro caso 'io'

/** Escucho en el evento de conexión los sockets entrantes al Servidor */
socket .on( 'connect', function() {
    console .log( 'Socket conectado al Servidor' );    // Registro en la consola la conexión del Socket al Servidor
});

/** Detecta la desconeción de los sockets entrantes al Servidor */
socket .on( 'disconnect', function() {
    console .log( 'Se ha perdido la conexión con el Servidor' );
});

/** Emite un mensaje al Servidor 
 * De esta misma manera usando la consola del navegador puedo enviar datos al Servidor
 * sin olvidar usar el mismo nombre del evento programado, en nuestro caso 'userData' */
socket .emit( 'userData', {             // 'userData' Nombre del evento que identifica el mensaje a Emitir
        user: 'Luisa Bazalar',          // Datos Enviados a través del Socket (Generalmente en formato JSON)
        email: 'luisaba@correo.co'
    },
    function( response ) {    // CallBack
        console .log( 'Responde el Servidor', response );
    } 
);

/** Escucha al Cliente & Recoge los datos Emitidos */
socket .on( 'userData', ( message ) => {     // 'userData' Nombre del evento esperado
    console .log( 'Desde el Servidor', message );
});
