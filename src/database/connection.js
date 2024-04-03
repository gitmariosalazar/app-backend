import pkg from 'pg';
const {Client, Pool} = pkg;
import {config} from 'dotenv';
config()
/*
const client = new Client({
    host: process.env.POSTGRESQL_HOST,
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
    port: process.env.POSTGRESQL_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: {
         ca: fs.readFileSync('./src/database/DigiCertGlobalRootCA.crt.pem')
     }
    
});
*/
/*
//? Connexion remote database
const client = new Pool({
    host: process.env.POSTGRESQL_ADDON_HOST,
    user: process.env.POSTGRESQL_ADDON_USER,
    password: process.env.POSTGRESQL_ADDON_PASSWORD,
    database: process.env.POSTGRESQL_ADDON_DB,
    port: process.env.POSTGRESQL_ADDON_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})
*/
/*
//! Connexion Local database
const client = new Pool({
    host: process.env.POSTGRESQL_HOST,
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
    port: process.env.POSTGRESQL_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})
*/


//? Connexion remote database Render.com
const client = new Pool({
    host: process.env.POSTGRESQL_ADDON_HOST_RENDER,
    user: process.env.POSTGRESQL_ADDON_USER_RENDER,
    password: process.env.POSTGRESQL_ADDON_PASSWORD_RENDER,
    database: process.env.POSTGRESQL_ADDON_DB_RENDER,
    port: process.env.POSTGRESQL_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: true
})


export {client};