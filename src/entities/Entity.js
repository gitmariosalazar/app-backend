class Entity {
    static UserType (user_type) {
        if (user_type) {
            return {
                id_usertype: user_type.id_usertype,
                user_type_name: user_type.user_type_name
            }
        }
        else {
            return null
        }
    }

    static ListUserTypes (users_types) {
        //console.log("Users types: ", users_types)
        return users_types.map(user_type => this.UserType(user_type));
    }


    static Users (user, users_types) {
        if (user) {
            return {
                id_user: user.id_user,
                user_name: user.user_name,
                user_email: user.user_email,
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone,
                address: user.address,
                user_state: user.user_state,
                register_date: user.register_date,
                password: user.password,
                user_delete: user.user_delete,
                user_type: this.ListUserTypes(users_types)
            }
        }
    }

    static ListUsers (users, users_types) {
        return users.map(user => this.Users(user, users_types));
    }
}

export {Entity}