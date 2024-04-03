import {Entity} from "../entities/Entity.js";

const users = [
    {
        id_user: 1,
        user_name: 'nombreUsuario1',
        user_email: 'correoUsuario1@example.com',
        first_name: 'Nombre1',
        last_name: 'Apellido1',
        phone: '123456789',
        address: 'Direcci¢n1',
        user_state: true,
        register_date: "2024-02 - 27T05:00:00.000Z",
        password: 'hashed_password1',
        user_delete: false,
        user_type: 1
    },
    {
        id_user: 2,
        user_name: 'nombreUsuario2',
        user_email: 'correoUsuario2@example.com',
        first_name: 'Nombre2',
        last_name: 'Apellido2',
        phone: '987654321',
        address: 'Direcci¢n2',
        user_state: true,
        register_date: "2024-02 - 27T05:00:00.000Z",
        password: 'hashed_password2',
        user_delete: false,
        user_type: 2
    }
]



function ConvertStringToNumber (a) {
    const n = Number(a)
    if (n) {
        return n
    }
    else {
        return 0
    }
}


export {
    ConvertStringToNumber
}