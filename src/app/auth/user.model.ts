export class User {

    nombre: string;
    uid: string;
    email: string;
    
    constructor(nombre: string, uid: string, email: string) {
        this.nombre = nombre;
        this.uid = uid;
        this.email = email;
    }
}