const { io } = require( '../server' ),
    { Users } = require( '../classes/users' ),      // Obtiene la Clase Usuarios
    users = new Users(),                            // Instancia objeto de la clase Usuarios 
    { createMessage } = require( '../utils/utils' );               // Utilidades

/** Escucho en el evento de conexión del Cliente. */
io .on( 'connection', ( client ) => {
    console .log( 'Socket: Cliente conectado al Servidor' );    // Registro en la consola la conexión del Socket al Servidor

    /** Escucha evento de desconección del Cliente */
    client .on( 'disconnect', () => {
        let userLeavesChat = users .delete( client .id );        // Elimina usuario usando el ID del Socket
        
        console .group( 'Usuario desconectado del Servidor' );
        console .log( `${ userLeavesChat .username } ha abandonado!` );
        console .groupEnd();

        /** Emite a todos los Clientes: Usuario que ha abandonado el chat */
        client .broadcast .emit( 'leaveChat', createMessage( 'Administrador', `${ userLeavesChat .username } ha abandonado el chat` ) );
        /** Emite a todos los Clientes: Listado actual de Usuarios en linea */
        client .broadcast .emit( 'usersOnline', users .getAll() );
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

        /** Agrega usuario usando el ID del Socket y el 'username' proporcionado desde el FrontEnd */
        let usersOnline = users .add( client .id, data .username );   

        console .group( 'Usuario conectado al Servidor' );
        console .log( `${ data .username } se ha conectado!` );
        console .groupEnd();

        /** Emite a todos los Clientes: Listado actual de Usuarios en linea */
        client .broadcast .emit( 'usersOnline', users .getAll() );

        callback({
            success: true,
            usersOnline
        }); 
    });

    /** Escucha el evento de enviar mensaje a todos */
    client .on( 'sendMessageToEveryone', ( data ) => {
        let user = users .getById( client .id ),                        // Obtiene el usuario actual
            message = createMessage( user .username, data .message );   // Crea el mensaje con el nombre y el mensaje que el usuario desea enviar a todos

        console .log( 'sendMessageToEveryone', message );

        client .broadcast .emit( 'sentToEveryone', message );
    });

    /** Escucha al Cliente & Obtiene Mensajes Privados */
    client .on( 'sentToAUser', ( data ) => {
        let user = users .getById( client .id ),                        // Obtiene el usuario actual
            message = createMessage( user .username, data .message );   // Crea el mensaje con el nombre y el mensaje que el usuario desea enviar a todos

        console .log( 'sentToAUser', data );

        client .broadcast .to( data .to ) .emit( 'sentToAUser', message );
    });

});