/** Clase */
class Users {
    constructor() {
        this .users = [];   // Usuarios conectados al Chat
    }

    add( id, username, chatroom ) {
        let newuser = { id, username, chatroom };

        this .users .push( newuser );

        return this .users;
    }   

    getById( id ) {
        let user = this .users .filter( user => user .id === id )[ 0 ];   // Regresa solo al usuario cuyo 'id' sea igual al 'id' solicitado. Como filter retorna un Array le diremos que solo queremos el resultado del primero es decir el campo CERO

        return user;
    }

    getAll() {
        return this .users;
    }

    delete( id ) {
        let userDeleted = this .getById( id );

        this .users = this .users .filter( user => {
            return user .id != id;      // Regresa todos los usuarios diferentes al 'id' solicitado
        });

        return userDeleted;
    }
}

/** Exporta */
module .exports = {
    Users
}