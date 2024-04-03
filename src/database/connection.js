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



export {client};