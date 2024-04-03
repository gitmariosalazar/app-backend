import CryptoJS from "crypto-js";
import {config} from 'dotenv';

config()

var secretkey = process.env.SECRET_KEY

function cipherPassword (password) {
    var cipherpwd = CryptoJS.AES.encrypt(password, secretkey).toString();
    return cipherpwd
}

function decryptPassword (password) {
    var bytes = CryptoJS.AES.decrypt(password, secretkey);
    var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    return originalPassword
}

function ComparePasswords (text, cipher) {
    var cipher_pwd = decryptPassword(cipher)
    if (cipher_pwd == text) {
        return true
    }
    else {
        return false
    }
}


function convertirStringAFecha (fechaString) {
    const fecha = new Date(fechaString);
    if (isNaN(fecha) || fecha.toString() === "Invalid Date") {
        console.error("La cadena proporcionada no es una fecha válida.");
        return null;
    }
    return fecha;
}

export {
    cipherPassword,
    decryptPassword, ComparePasswords, convertirStringAFecha
}