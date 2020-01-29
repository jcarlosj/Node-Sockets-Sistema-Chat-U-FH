/** Sockets */
var socket = io(),      // Como la hemos definido en el BackEnd debemos invocarla en el FrontEnd. En nuestro caso 'io'
    params = new URLSearchParams( window .location .search ),
    newUser;

/** Valida si NO se ha pasado como parametro 'username' en la URL */
if( ! params .has( 'username' ) ) {
    window .location = 'index.html';    // Redireccion
    throw new Error( 'El nick o nombre de usuario es necesario' );
}

newUser = {
    username: params .get( 'username' )
}

/** Escucho en el evento de conexión los sockets entrantes al Servidor */
socket .on( 'connect', () => {
    console .log( 'Socket: Servidor conectado al Cliente' );    // Registro en la consola la conexión del Socket al Servidor

    socket .emit( 'enterTheChat', newUser, ( dataResponse ) => {
        console .log( 'Server (connect:enterTheChat)', dataResponse );
    });
});

/** Escucha evento que notifica cuando un usuario ha dejado el chat */
socket .on( 'leaveChat', ( dataResponse ) => {
    console .log( 'Server (leaveChat)', dataResponse );
});
/** Escucha evento que notifica Usuarios que estan en linea (Cuando un usuario entra o sale del Chat) */
socket .on( 'usersOnline', ( dataResponse ) => {
    console .log( 'Server (usersOnline)', dataResponse );
});

/** Detecta la desconeción de los sockets entrantes al Servidor */
socket .on( 'disconnect', () => {
    console .log( 'Se ha perdido la conexión con el Servidor' );
});

/** Escucha al Servidor & Obtiene datos Emitidos por el Servidor */
socket .on( 'userData', ( message ) => {     // 'userData' Nombre del evento esperado
    console .log( 'Desde el Servidor', message );
});

/** Escucha al Servidor & Obtiene Mensajes Publicos */
socket .on( 'sentToEveryone', ( message ) => {     // 'userData' Nombre del evento esperado
    console .log( 'Desde el Servidor', message );
});