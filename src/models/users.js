import {client} from "../database/connection.js";
import {Entity} from "../entities/Entity.js";
import {ComparePasswords, cipherPassword} from "../utils/encrypt.js";
import {ConvertStringToNumber} from "../utils/mario.js";
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config()

const getUsersTypes = async (req, res) => {
    try {
        client.query('SELECT * FROM user_type ORDER BY id_usertype;', (err, result) => {

            if (err) {
                res.status(404).json({
                    error: err.message,
                    message: "Error!",
                    results: null
                });
            }
            else {
                res.status(200).json({
                    error: null,
                    message: "Users Types found successfully!",
                    results: Entity.ListUserTypes(result.rows)
                });
            }

        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error!",
            results: null
        });
    }
}


const getUserTypeById = async (req, res) => {
    try {
        const id_usertype = req.params.id
        if (!id_usertype) {
            throw Error("Please, enter the user_name or email address!")
        }
        client.query("select*from user_type where id_usertype = $1;", [id_usertype]).then(data => {
            if (data.rowCount > 0) {
                res.status(404).json({
                    error: null,
                    message: "User Type found successfully!",
                    results: Entity.UserType(data.rows[0])
                });
            }
            else {
                res.status(404).json({
                    error: null,
                    message: "User Type not found on database!",
                    results: null
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error!",
            results: null
        })
    }
}

const getUserTypeByUserId = async (id) => {
    try {
        if (!id) {
            throw Error("Please, enter the user Id or Email address!")
        }
        client.query("select*from user_type where users = $1;", [id]).then(data => {
            console.log(data.rows)
            if (data.rowCount > 0) {
                return Entity.UserType(data.rows[0])
            }
            else {
                return null
            }
        })
    } catch (error) {
        return null
    }
}

// Users

const getUsers = async (req, res) => {
    try {
        client.query(`SELECT json_build_object('id_user', u.id_user,
            'user_name', u.user_name,
            'user_email', u.user_email,
            'first_name', u.first_name,
            'last_name', u.last_name,
            'phone', u.phone,
            'address', u.address,
            'user_state', u.user_state,
            'register_date', u.register_date,
            'password', u.password,
            'user_types', (
            json_agg(json_build_object(
                'id_usertype', ut.id_usertype,
                'user_type_name', ut.user_type_name
            ))
        )
        ) as users
        FROM users u, assigment_userstypes aut, user_type ut
        WHERE aut.users = u.id_user and aut.user_type = ut.id_usertype and u.user_delete = false
        group by u.id_user order by u,id_user asc;`, (err, result) => {
            if (err) {
                res.status(404).json({
                    error: err.message,
                    message: "Error!",
                    results: null
                });
            }
            else {
                res.status(200).json({
                    error: null,
                    message: "Users found successfully! ",
                    results: result.rows
                });
            }

        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error!",
            results: null
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const email_username = req.params.id
        if (!email_username) {
            throw Error("Please, enter the user_name or email address!")
        }
        client.query(`SELECT json_build_object('id_user', u.id_user,
            'user_name', u.user_name,
            'user_email', u.user_email,
            'first_name', u.first_name,
            'last_name', u.last_name,
            'phone', u.phone,
            'address', u.address,
            'user_state', u.user_state,
            'register_date', u.register_date,
            'password', u.password,
            'user_types', (
            json_agg(json_build_object(
                'id_usertype', ut.id_usertype,
                'user_type_name', ut.user_type_name
            ))
        )
        ) as users
        FROM users u, assigment_userstypes aut, user_type ut
        WHERE aut.users = u.id_user and aut.user_type = ut.id_usertype and (u.user_name = $1 or u.user_email = $1 or u.id_user = `+ ConvertStringToNumber(email_username) + `) and u.user_delete = false
        group by u.id_user order by u.id_user asc;`, [email_username]).then(data => {
            if (data.rowCount > 0) {
                res.status(404).json({
                    error: null,
                    message: "User found successfully!",
                    results: data.rows
                });
            }
            else {
                res.status(404).json({
                    error: null,
                    message: "User not found on database!",
                    results: null
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error!",
            results: null
        })
    }
}



const getUserName = async (id) => {
    const user = await client.query(`SELECT json_build_object('id_user', u.id_user,
            'user_name', u.user_name,
            'user_email', u.user_email,
            'first_name', u.first_name,
            'last_name', u.last_name,
            'phone', u.phone,
            'address', u.address,
            'user_state', u.user_state,
            'register_date', u.register_date,
            'password', u.password,
            'user_types', (
            json_agg(json_build_object(
                'id_usertype', ut.id_usertype,
                'user_type_name', ut.user_type_name
            ))
        )
        ) as users
        FROM users u, assigment_userstypes aut, user_type ut
        WHERE aut.users = u.id_user and aut.user_type = ut.id_usertype and (u.user_name = $1 or u.user_email = $1 or u.id_user = `+ ConvertStringToNumber(id) + `) and u.user_delete = false
        group by u.id_user order by u,id_user asc;`, [id])
    return user.rows[0]
}



const createUser = async (req, res) => {
    try {
        const {user_name, user_email, first_name, last_name, phone, address, password, repeat_password} = req.body
        const user = await getUserName(user_name) || await getUserName(user_email)
        if (user) {
            throw Error("User exist on database!")
        }
        if (password == repeat_password) {
            const new_user = await client.query(`insert into users (user_name, user_email, first_name, last_name, phone, address, user_state, register_date, password, user_delete) 
        values ($1, $2, $3, $4, $5, $6, false, CURRENT_TIMESTAMP, $7, false) returning id_user`, [user_name, user_email, first_name, last_name, phone, address, cipherPassword(password)])
            client.query(`insert into assigment_userstypes (users, user_type) values ($1, 1);`, [new_user.rows[0].id_user]).
                then(async data => {
                    if (data.rowCount > 0) {
                        const u = await getUserName(user_name)
                        res.status(404).json({
                            error: null,
                            message: "User create successfully!",
                            results: u.users
                        });
                    }
                    else {
                        res.status(404).json({
                            error: null,
                            message: "User wasn't inserted on database!",
                            results: null
                        });
                    }
                })
        }
        else {
            res.status(200).json({
                error: "Confirmation password failed!",
                message: "Error password confirmation!",
                results: null
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error!",
            results: null
        })
    }
}


const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const {user_name, user_email, first_name, last_name, phone, address} = req.body
        const user = await getUserName(id)
        if (user) {
            if (user.users.user_name == user_name || user.users.user_email == user_email) {
                res.status(200).json({
                    error: "Error!",
                    message: "Key (user_name)=(mario299salazar) already exists!",
                    results: null
                })
            }
            else {
                client.query(`update users set user_name = $1, user_email = $2, first_name = $3, last_name = $4, phone = $5, address = $6 where id_user = $7;`, [user_name, user_email, first_name, last_name, phone, address, id]).then(async (data, err) => {
                    console.log(err)
                    if (data.rowCount > 0) {
                        const u = await getUserName(user_name)
                        res.status(404).json({
                            error: null,
                            message: "User was updated successfully!",
                            results: u.users
                        });
                    }
                    else {
                        res.status(404).json({
                            error: null,
                            message: "User wasn't updated on database!",
                            results: null
                        });
                    }
                })
            }
        }
        else {
            res.status(402).json({
                error: "User not found!",
                message: "Error!",
                results: null
            })
        }

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error!",
            results: null
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await getUserName(id)
        if (user) {
            const new_user = await client.query(`update users set user_delete = true where id_user = $1;`, [id]).then(async data => {
                if (data.rowCount > 0) {
                    res.status(404).json({
                        error: null,
                        message: "User delete successfully!",
                        results: null
                    });
                }
                else {
                    res.status(404).json({
                        error: null,
                        message: "User wasn't inserted on database!",
                        results: null
                    });
                }
            })
        }
        else {
            res.status(402).json({
                error: "User not found!",
                message: "Error!",
                results: null
            })
        }

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error!",
            results: null
        })
    }
}

const changeUserPassword = async (req, res) => {
    try {
        const id = req.params.id
        const {current_password, new_password, repeat_password} = req.body
        const user = await getUserName(id)
        if (user) {
            if (ComparePasswords(current_password, user.users.password) && new_password == repeat_password) {
                client.query(`update users set password = $1 where id_user = $2;`, [cipherPassword(new_password), id]).then(async data => {
                    if (data.rowCount > 0) {
                        const u = await getUserName(id)
                        res.status(404).json({
                            error: null,
                            message: "User create successfully!",
                            results: u.users
                        });
                    }
                    else {
                        res.status(404).json({
                            error: null,
                            message: "User wasn't updated on database!",
                            results: null
                        });
                    }
                })
            }
            else {
                res.status(404).json({
                    error: null,
                    message: "The Current password or confirmation password failed!",
                    results: null
                });
            }
        }
        else {
            res.status(402).json({
                error: "User not found!",
                message: "Error!",
                results: null
            })
        }

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error!",
            results: null
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {user_name, password} = req.body
        const user = await getUserName(user_name)
        if (user) {
            if (!user.users.user_state) {
                res.status(200).json({
                    error: "Error!",
                    message: "User is inactive!",
                    results: null
                })
            }
            else {
                if (ComparePasswords(password, (user.users.password))) {
                    const u = await getUserName(user_name)
                    const secretkey = process.env.SECRET_KEY
                    const token = jwt.sign({
                        iss: "https://app-backend-utn-2023.onrender.com",
                        iat: Math.floor(Date.now() / 1000),
                        nbf: Math.floor(Date.now() / 1000),
                        exp: Math.floor(Date.now() / 1000) + 3600,
                        app_displayname: "app-backend-utn-2023",
                        appid: "app_9e7db781-2c01-40b8-8eef-54007e8db3aa",
                        user: user.users
                    }, secretkey);
                    res.status(404).json({
                        error: null,
                        message: "Login successfully!",
                        results: token
                    });
                }
                else {
                    res.status(404).json({
                        error: null,
                        message: "User Name or User Email isn't correct!",
                        results: null
                    });
                }

            }
        }
        else {
            res.status(402).json({
                error: "User not found!",
                message: "Error!",
                results: null
            })
        }

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error!",
            results: null
        })
    }
}

export {
    getUsersTypes, getUsers, getUserById, getUserTypeById, createUser, updateUser, deleteUser, changeUserPassword, loginUser
}