const { io } = require( '../server' ),
    { Users } = require( '../classes/users' ),      // Obtiene la Clase Usuarios
    users = new Users();                            // Instancia objeto de la clase Usuarios 

/** Escucho en el evento de conexión del Cliente. */
io .on( 'connection', ( client ) => {
    console .log( 'Usuario conectado al Servidor' );    // Registro en la consola la conexión del Socket al Servidor

    /** Escucha evento de desconección del Cliente */
    client .on( 'disconnect', () => {
        console .log( 'Usuario desconectado!' );
    });

    /** Emite un mensaje al Cliente  */
    client .emit( 'userData', {         // 'userData' Nombre del evento que identifica el mensaje a Emitir
            user: 'anonymous',              // Datos Enviados a través del Socket (Generalmente en formato JSON)
            message: 'Bienvenido al Chat'
        } 
    );

    /** Escucha el evento de ingreso al chat */
    client .on( 'enterTheChat', ( data, callback ) => {
        console .log( 'Usuario conectado:', data );

        /** Valida si NO existe el nombre del usuario */
        if( ! data .username ) {

            return callback({
                success: false,
                error: {
                    message: 'El nombre de usuario es necesario'
                }
            });
        }

        /** TO DO: 
         * 1. Evitar que se agregue el mismo usuario cuando se recarga el navegador.
         * 2. Actualizar la lista de usuarios para todo usuario conectado. */
        let usersOnline = users .add( client .id, data .username );   // Agrega usuario usando el ID del Socket y el 'username' proporcionado desde el FrontEnd

        callback({
            success: true,
            usersOnline
        }); 
    });

});